import {defineConfig} from 'vitepress'
import container from 'markdown-it-container'
import {transliterate} from 'transliteration'
import postcssRTLCSS from 'postcss-rtlcss'
import {Mode} from 'postcss-rtlcss/options'
import {SIDEBAR_CONFIG} from './sidebar.js'
import {SECTION_PAGER, SECTION_SIDEBARS} from './section-trees.js'
import {PAGE_DESCRIPTIONS} from './page-descriptions.js'
import {collectPageForSearchIndex, devSearchIndexPlugin, writeSearchIndexJSON} from './search-index-builder.mts'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

// VitePress treats a link to an unknown extension as a page and appends .html. The Groovy example
// sources under public/groovy-examples/ are plain files, so .groovy must count as a known extension,
// both for link rendering at build time and for the client router (it reads import.meta.env).
process.env.VITE_EXTRA_EXTENSIONS = 'groovy'

const HOSTNAME = 'https://docs.namasoft.com/'
const SEARCH_INDEX_STABLE_PATH = path.join(path.dirname(fileURLToPath(import.meta.url)), 'search-index.json')
const DOCS_DIR = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

function rtlLtrContainer(md, type) {
    md.use(container, type, {
        render: (tokens, idx) =>
            tokens[idx].nesting === 1 ? `<div dir="${type}" class="${type}-block">\n` : '</div>\n'
    })
}

// Entity-flow page filenames are not free-form: GenEntityFlowsDocumentation writes every page as
// <module>/<ClassSimpleName>.md, so a class that exists in a base module and is subclassed in
// another produces the same basename twice and cannot be renamed away. List the canonical target
// here so the legacy basename short-link still resolves instead of being dropped.
const REDIRECT_CANONICAL_TARGETS = {
    // magento's class is a thin subclass of the supply chain one; the supply chain page is the real doc
    'EASalesRecalculateFreeAndRelatedItems': '/entity-flows/supplychain/EASalesRecalculateFreeAndRelatedItems.html'
}

// Pages deleted after their content was merged into another page. They have no basename left to
// map, so name the page that absorbed them here to keep old links and search results working.
const RETIRED_PAGE_REDIRECTS = {
    'field-filter-faq': '/platform/field-filtering/field-filter-with-criteria.html',
    'electronic-receipt-egypt-tax-eInvoice': '/modules/invoicing/egypt-einvoice-guide.html',
    'egypt-einvoice-bank-details': '/modules/invoicing/egypt-einvoice-guide.html',
    'screen-modifier-faq': '/platform/screen-modifier/screen-modifier-overview.html',
    'approvals-faq': '/platform/approvals/approvals-system.html',
    'ea-gen-entity-from-entity': '/entity-flows/core/EAGenerateEntityFromEntityAction.html',
    'invoice-retriever': '/platform/fields-and-entities-settings/fields-settings-integrations.html',
    'oracle-jdbc-connection': '/integration/system-integration-scenarios.html',
    'mobile-apps-faq': '/modules/mobile/mobile-application-guide.html',
    'database-error-related-faq': '/admin/troubleshooting/general-faq.html',
    'real-estate-fq': '/modules/realestate/costs/realestate-cost-distribution.html',
    'invoices-faq': '/modules/invoicing/payment-schedules-user-guide.html',
    'docs-quick-guide': '/platform/import-export/importing-records.html',
    'dev-request-guidelines': '/admin/dev-request-guidelines.html',
    'shortcuts-ar': '/platform/shortcuts.html',
    'gui-post-actions-faq': '/platform/automation-and-rules/gui-post-actions.html',
    'utils': '/admin/reprocessing/batch-utilities-from-file.html',
    'assembly-and-packaging': '/modules/supplychain/assembly-and-packaging/',
    // Omniful flows are documented only inside the Omniful guide (decision 2026-10-10)
    'EAReadOmnifulOrders': '/modules/ecommerce/omniful-integration.html',
    'EAReadOmnifulOrdersByIds': '/modules/ecommerce/omniful-integration.html',
    'EAReReadOmnifulOrder': '/modules/ecommerce/omniful-integration.html',
    'magento-integration-guide': '/modules/ecommerce/ecommerce-integration-guide.html'
}

// Pages moved to a new folder (basename unchanged), and pages replaced by a folder landing. The
// basename map above only serves the English tree through Apache, so each old URL also gets a
// static meta-refresh stub at its old path — in English and under /ar/ — written after the build.
// Keys and values are site paths without .html; a value ending in "/" is a folder landing.
const MOVED_PAGE_REDIRECTS = {
    '/modules/supplychain/assembly-and-packaging': '/modules/supplychain/assembly-and-packaging/',
    // The developer/ folder was dropped (2026-10-10); its only content was a card to GUI Post Actions
    '/developer/index': '/platform/automation-and-rules/gui-post-actions',
    '/developer': '/platform/automation-and-rules/gui-post-actions',
    // Renamed (2026-10-13): the guide covers every storefront platform, not only Magento
    '/modules/ecommerce/magento-integration-guide': '/modules/ecommerce/ecommerce-integration-guide',
    ...Object.fromEntries(Object.entries({
        'documents-and-records': ['document-lifecycle', 'document-books', 'document-cancel-document',
            'why-a-record-will-not-save-or-delete', 'messages-and-refusals', 'master-groups', 'attachments',
            'form-documents', 'spare-master-files'],
        'shared-master-files': ['dimensions-and-composite-dimensions', 'customers-suppliers-and-parties',
            'currencies-and-exchange-rates', 'accounting-side-config'],
        'payments': ['payment-methods-and-terminals', 'pgw-card-terminal-app', 'pgw-card-payment-flow',
            'pgw-card-refusal-codes', 'receipt-books'],
        'governance': ['revise-and-unrevise', 'fiscal-period-control-guide', 'freeze-processing-and-dates-overrider',
            'criteria-based-validation', 'required-fields', 'audit-trail'],
        'automation-and-rules': ['gui-post-actions', 'scheduled-tasks', 'recurring-documents', 'virtual-entity-guide',
            'criteria-definitions', 'entity-type-lists', 'text-criteria-guide'],
        'everyday-tools': ['screen-buttons', 'remarks-and-agenda', 'default-values-templates', 'prevent-usage',
            'shortcuts', 'global-search', 'field-help-and-tooltips', 'ui-themes']
    }).flatMap(([folder, pages]) => pages.map(p => [`/platform/${p}`, `/platform/${folder}/${p}`]))),
    // The flat accounting pages were grouped into folders (2026-10-24)
    ...Object.fromEntries(Object.entries({
        'ledger-setup': ['accounting-concepts-and-setup', 'chart-of-accounts', 'accounts',
            'system-accounts-and-exceptions', 'journal-entries', 'year-end-and-period-control'],
        'money-in-and-out': ['receipts-and-payments', 'credit-and-debit-notes', 'aging-allocation',
            'subsidiary-reconciliation', 'cashier-shifts', 'misc-purchasing', 'party-evaluation',
            'partner-shares-and-profit-distribution'],
        'banks-and-cheques': ['banks-and-bank-accounts', 'bank-reconciliation', 'cheques-financial-papers'],
        'bank-facilities': ['bank-loans', 'fixed-deposits', 'credit-facilities', 'letters-of-guarantee',
            'bank-letters-of-credit'],
        'investments': ['investment-portfolios', 'investment-documents', 'treasury-bills'],
        'planning-and-commitments': ['prepaid-expenses', 'financial-commitments', 'financial-budgets'],
        'financial-reporting': ['reports-account-statements-and-trial-balance', 'financial-statements',
            'consolidated-statements']
    }).flatMap(([folder, pages]) => pages.map(p => [`/modules/accounting/${p}`, `/modules/accounting/${folder}/${p}`])))
}

// Runs after writeRedirectsMap so the stubs never enter the basename map (they would collide with the
// real pages and knock them out of it).
function writeMovedPageStubs(outDir) {
    let written = 0
    for (const [from, to] of Object.entries(MOVED_PAGE_REDIRECTS)) {
        for (const prefix of ['', '/ar']) {
            const target = prefix + (to.endsWith('/') ? to : to + '.html')
            const stub = path.join(outDir, (prefix + from).replace(/^\//, '') + '.html')
            if (fs.existsSync(stub)) {
                console.warn(`[moved-pages] ${prefix + from}.html exists — no stub written`)
                continue
            }
            fs.mkdirSync(path.dirname(stub), {recursive: true})
            fs.writeFileSync(stub, `<!doctype html><html><head><meta charset="utf-8"><title>Moved</title>` +
                `<link rel="canonical" href="${HOSTNAME}${target.replace(/^\//, '')}">` +
                `<meta name="robots" content="noindex">` +
                `<meta http-equiv="refresh" content="0; url=${target}">` +
                `<script>location.replace(${JSON.stringify(target)} + location.hash)</script></head>` +
                `<body><a href="${target}">${target}</a></body></html>`, 'utf8')
            written++
        }
    }
    console.log(`[moved-pages] wrote ${written} redirect stub(s)`)
}

function writeRedirectsMap(destDir) {
    const map = new Map()
    const collisions = new Map()

    function walk(dir) {
        for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
            const full = path.join(dir, entry.name)
            if (entry.isDirectory()) {
                // Legacy basename short-links always point at the English (root) pages;
                // the /ar/ mirror would otherwise collide with every translated page
                if (dir === destDir && entry.name === 'ar') continue
                walk(full)
                continue
            }
            if (!entry.isFile() || !entry.name.endsWith('.html')) continue
            if (entry.name === 'index.html') continue

            const base = entry.name.slice(0, -'.html'.length)
            const urlPath = '/' + path.relative(destDir, full).split(path.sep).join('/')

            if (map.has(base)) {
                if (!collisions.has(base)) collisions.set(base, [map.get(base)])
                collisions.get(base).push(urlPath)
            } else {
                map.set(base, urlPath)
            }
        }
    }

    walk(destDir)

    for (const [base, paths] of collisions) {
        const canonical = REDIRECT_CANONICAL_TARGETS[base]
        if (canonical && paths.includes(canonical)) {
            map.set(base, canonical)
            collisions.delete(base)
            continue
        }
        map.delete(base)
        console.warn(`[redirects] duplicate basename "${base}" — no redirect generated:\n  ` + paths.join('\n  '))
    }

    for (const [base, target] of Object.entries(RETIRED_PAGE_REDIRECTS)) {
        if (!map.has(base)) map.set(base, target)
    }

    const lines = [...map.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k}\t${v}`)
        .join('\n')
    fs.writeFileSync(path.join(destDir, 'redirects.txt'), lines + '\n', 'utf8')
    console.log(`[redirects] wrote ${map.size} entries to redirects.txt (${collisions.size} basenames skipped)`)
}

function pageUrl(relativePath) {
    return HOSTNAME + relativePath.replace(/\.md$/, '.html').replace(/(^|\/)index\.html$/, '$1')
}

// Search engines only serve a reader the copy in their language when each copy names the other, so
// link the English page and its /ar/ mirror (English as the default) whenever both exist.
function languageAlternates(relativePath) {
    const english = relativePath.replace(/^ar\//, '')
    const arabic = 'ar/' + english
    if (!fs.existsSync(path.join(DOCS_DIR, english)) || !fs.existsSync(path.join(DOCS_DIR, arabic)))
        return []
    return [
        ['link', {rel: 'alternate', hreflang: 'en', href: pageUrl(english)}],
        ['link', {rel: 'alternate', hreflang: 'ar', href: pageUrl(arabic)}],
        ['link', {rel: 'alternate', hreflang: 'x-default', href: pageUrl(english)}]
    ]
}

// The home page links the newest release notes. Found at build time from the file names, and labelled
// with the month from the page's own H1 ("# Nama ERP Release Notes - September 2026"), so it never
// goes stale and the Arabic label is the Arabic page's own wording.
function latestReleaseAction(localePrefix) {
    const root = path.join(DOCS_DIR, localePrefix, 'release-notes')
    const year = fs.readdirSync(root).filter(name => /^\d{4}$/.test(name)).sort().at(-1)
    const file = fs.readdirSync(path.join(root, year)).filter(name => /^nama-erp-\d{6}-release-notes\.md$/.test(name)).sort().at(-1)
    const month = fs.readFileSync(path.join(root, year, file), 'utf8').match(/^# .* - (.+)$/m)?.[1].trim()
    if (!month)
        return null
    return {
        theme: 'alt',
        text: (localePrefix ? 'أحدث إصدار: ' : 'Latest release: ') + month,
        link: `/${localePrefix}release-notes/${year}/${file.replace(/\.md$/, '')}`
    }
}

// The keys GenNamaDocsIndex writes into section-trees.js: the folder holding the page, and the page itself
function folderKey(relativePath) {
    return '/' + relativePath.replace(/[^/]*\.md$/, '')
}

function pageKey(relativePath) {
    return '/' + relativePath.replace(/index\.md$/, '').replace(/\.md$/, '')
}

// Search engines show the meta description as the result snippet, so every page needs its own rather
// than the site-wide one. Order: the page's frontmatter, then its first prose sentence (written by
// GenNamaDocsIndex), then a landing page's hero tagline, then its title for pages that open with a
// link list instead of prose.
function pageDescription(pageData) {
    if (pageData.description)
        return pageData.description
    if (PAGE_DESCRIPTIONS[pageData.relativePath])
        return PAGE_DESCRIPTIONS[pageData.relativePath]
    if (pageData.frontmatter.hero?.tagline)
        return pageData.frontmatter.hero.tagline
    if (!pageData.title)
        return ''
    return pageData.relativePath.startsWith('ar/')
        ? `${pageData.title} — توثيق نظام نما ERP`
        : `${pageData.title} — Nama ERP documentation`
}

// VitePress's dead-link checker only validates markdown-syntax links; links rendered by a Vue
// component (LandingCard props, the page-data driven sidebar) become raw <a> tags it never inspects.
// This walks the built output and fails the build on any of them that doesn't resolve.
function validateComponentLinks(outDir, base) {
    const broken = []
    let checked = 0
    const anchorRe = /<a\b[^>]*\bclass="[^"]*\b(?:landing-card|section-link)\b[^"]*"[^>]*>/g
    const hrefRe = /\bhref="([^"]+)"/

    function walk(dir) {
        for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
            const full = path.join(dir, entry.name)
            if (entry.isDirectory()) {
                walk(full)
                continue
            }
            if (!entry.isFile() || !entry.name.endsWith('.html')) continue
            const html = fs.readFileSync(full, 'utf8')
            const sourcePage = '/' + path.relative(outDir, full).split(path.sep).join('/')
            for (const tag of html.match(anchorRe) || []) {
                const m = hrefRe.exec(tag)
                if (!m) continue
                const href = m[1]
                if (/^(https?:)?\/\//.test(href) || href.startsWith('mailto:')) continue
                let target = href.split('#')[0].split('?')[0]
                if (!target.startsWith('/')) continue
                if (base !== '/' && target.startsWith(base)) target = '/' + target.slice(base.length)
                target = target.replace(/^\/+/, '')
                if (target === '' || target.endsWith('/')) target += 'index.html'
                checked++
                if (!fs.existsSync(path.join(outDir, target)))
                    broken.push(`${sourcePage} -> ${href}`)
            }
        }
    }

    walk(outDir)
    console.log(`[component-links] checked ${checked} component-rendered link(s)`)
    if (broken.length)
        throw new Error(`[component-links] ${broken.length} broken component-rendered link(s):\n  ` + broken.join('\n  '))
}

export default defineConfig({
    title: 'Nama Docs',
    description: 'Nama ERP Documentation',
    locales: {
        root: {
            label: 'English',
            lang: 'en',
            dir: 'ltr',
            themeConfig: {
                nav: [
                    {text: 'Home', link: '/'},
                    {text: 'Q&A', link: 'https://ask.namasoft.com'},
                    {text: 'Namasoft.com', link: 'https://namasoft.com'},
                    {text: 'Data Model', link: 'https://dm.namasoft.com'}
                ]
            }
        },
        ar: {
            label: 'العربية',
            lang: 'ar',
            dir: 'rtl',
            link: '/ar/',
            themeConfig: {
                nav: [
                    {text: 'الرئيسية', link: '/ar/'},
                    {text: 'Q&A', link: 'https://ask.namasoft.com'},
                    {text: 'Namasoft.com', link: 'https://namasoft.com'},
                    {text: 'Data Model', link: 'https://dm.namasoft.com'}
                ]
            }
        }
    },
    vite: {
        css: {
            postcss: {
                // Auto-generates [dir="rtl"] mirrored rules for ALL css (including the default theme),
                // so the whole layout flips for the Arabic (/ar/) locale. The original (LTR) rules
                // stay untouched for the default English (root) locale.
                plugins: [postcssRTLCSS({mode: Mode.override})]
            }
        },
        plugins: [devSearchIndexPlugin(SEARCH_INDEX_STABLE_PATH)]
    },
    head: [
        ['link', {rel: 'shortcut icon', type: 'image/png', href: '/namasoft.png'}],
        ['script', {async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-H68GM8HY15'}],
        ['script', {}, `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-H68GM8HY15');`]
    ],
    // Strict: the build fails on dead internal links (the site is currently clean)
    ignoreDeadLinks: false,
    sitemap: {hostname: HOSTNAME},
    markdown: {
        anchor: {
            // Must stay identical to the old VuePress slugify — existing inbound anchor links depend on it
            slugify: (str) => transliterate(str).replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]/g, '')
        },
        config: (md) => {
            rtlLtrContainer(md, 'rtl')
            rtlLtrContainer(md, 'ltr')
        }
    },
    transformPageData(pageData) {
        // The sidebar rides along with each page's own data instead of themeConfig, which VitePress
        // inlines into every generated page (SectionSidebar renders it). The prev/next footer would
        // normally be derived from that inlined sidebar, so its links are handed over here as well.
        pageData.frontmatter.sectionSidebar = SECTION_SIDEBARS[folderKey(pageData.relativePath)] ?? []
        const pager = SECTION_PAGER[pageKey(pageData.relativePath)]
        if (pager?.prev)
            pageData.frontmatter.prev ??= pager.prev
        if (pager?.next)
            pageData.frontmatter.next ??= pager.next
        pageData.description = pageDescription(pageData)
        pageData.frontmatter.head ??= []
        pageData.frontmatter.head.push(
            ['link', {rel: 'canonical', href: pageUrl(pageData.relativePath)}],
            ['meta', {property: 'og:title', content: pageData.title || 'Nama Docs'}],
            ['meta', {property: 'og:description', content: pageData.description || 'Nama ERP Documentation'}],
            ['meta', {property: 'og:url', content: pageUrl(pageData.relativePath)}],
            ['meta', {property: 'og:type', content: 'article'}],
            ...languageAlternates(pageData.relativePath)
        )
        if (pageData.relativePath === 'index.md' || pageData.relativePath === 'ar/index.md') {
            const latest = latestReleaseAction(pageData.relativePath === 'ar/index.md' ? 'ar/' : '')
            const actions = pageData.frontmatter.hero?.actions
            if (latest && actions && !actions.some(action => action.link === latest.link))
                actions.push(latest)
        }
    },
    themeConfig: {
        logo: '/hero.svg',
        sidebar: SIDEBAR_CONFIG,
        editLink: {
            pattern: 'https://github.com/namasoft/namaerp-docs/edit/master/docs/:path',
            text: 'Edit On github'
        },
        socialLinks: [
            {icon: 'github', link: 'https://github.com/namasoft/namaerp-docs'}
        ],
    },
    transformHtml: (html, id, ctx) => {
        collectPageForSearchIndex(html, ctx.page, ctx.pageData.title)
    },
    buildEnd: (siteConfig) => {
        writeRedirectsMap(siteConfig.outDir)
        writeMovedPageStubs(siteConfig.outDir)
        writeSearchIndexJSON(siteConfig.outDir, SEARCH_INDEX_STABLE_PATH)
        validateComponentLinks(siteConfig.outDir, siteConfig.site.base)
    }
})
