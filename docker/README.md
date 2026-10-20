# docs.namasoft.com search — Meilisearch

Replaces VitePress's built-in `local` (minisearch) provider, which had two problems:

1. It shipped the **whole index to the browser** — 10.7 MB (`ar`) + 8.0 MB (root) of JS
   downloaded before the first keystroke did anything.
2. It indexed the generated folder link-tree pages. `search-index-builder.mts` drops
   everything inside `.ignore-in-full-text-search`, but minisearch never saw that rule,
   so pages that are nothing but lists of every title beneath them matched almost any
   query and buried the real guides.

Meilisearch fixes both: the index lives server-side (zero bytes shipped) and it is built
from `search-index.json`, which already has the exclusions applied.

## Shape

```
browser ──► NLM  /nlm/docs-search  (searchMode: "meili") ──► Meilisearch :7701
                 DocsSearchEngine.java                        (loopback only)
                 MeiliDocsSearcher.java
```

The browser never reaches Meilisearch. It is bound to `127.0.0.1`, so nothing is publicly
exposed and no API key is in any client bundle. If Meilisearch is down or unconfigured,
`DocsSearchEngine` falls back to the existing Lucene fuzzy path rather than failing.

## Setup — one script

Everything below is automated by **`low/nlm/init-docs-search.sh`** in the private repo. It
installs docker if missing, generates the two secrets, writes them to all three places that
must agree, starts the container, installs the systemd unit, waits for health, and pushes an
already-built index if one is present:

```bash
sudo ./init-docs-search.sh                 # from low/nlm on the server
sudo ./init-docs-search.sh --restart-nlm   # and restart tomcatnlm so NLM re-reads its config
```

It is idempotent and **reuses existing secrets rather than regenerating them** — the three
files have to carry identical values, so re-running is safe.

The rest of this section is what that script does, for when you need to check or repair a
piece of it by hand.

### By hand

```bash
cp .env.example .env
openssl rand -hex 32           # paste into MEILI_MASTER_KEY
docker compose up -d
curl http://127.0.0.1:7701/health
```

Auto-start on boot comes from `restart: unless-stopped`, which needs the docker daemon
enabled:

```bash
systemctl enable --now docker
```

For an explicit service unit instead (`systemctl status docs-search`, journal logs,
ordered startup), run `./install-service.sh` — see the header of that file.

### The two clients

**The deploy-time push** reads its secrets from `/etc/docs-search.env` — deliberately
outside this repo, which is public:

```bash
cat > /etc/docs-search.env <<EOF
MEILI_MASTER_KEY=<same key as docker/.env>
DOCS_SEARCH_TOKEN=<a second, different secret>
EOF
chmod 600 /etc/docs-search.env
```

`../build-and-deploy.sh` then pushes on every deploy and evicts NLM's cache afterwards.
Either step skips with a warning if its secret is missing, so the site still deploys.

**NLM** reads these from `nama.properties` via `GeneralSettings` (same source as the
`milvus.*` keys), and only re-reads them **on restart**:

| Property     | Default                 |
|--------------|-------------------------|
| `meili.host` | `http://127.0.0.1:7701` |
| `meili.key`  | *(required)*            |
| `meili.index`| `namaerp-docs`          |
| `docs.search.admin.token` | *(required)* — must equal `DOCS_SEARCH_TOKEN` above |

`meili.key` empty ⇒ `isConfigured()` is false ⇒ the servlet uses Lucene.

`docs.search.admin.token` guards `?evict-cache=true`, which is not a read: it drops every
cache and triggers a full OpenAI re-embed. It **fails closed** — unset means every eviction
is rejected with 401, including your deploy's. Set it before deploying NLM. The secret
travels in an `X-Docs-Search-Token` header rather than the query string, so it stays out of
access logs, and the header is deliberately absent from `Access-Control-Allow-Headers` so no
browser can send it cross-origin.

## One VM, three tenants

NLM, the docs build and this container all share the same server. Two consequences:

**The loopback binding works because of it.** Both clients — the deploy-time push script and
NLM's `MeiliDocsSearcher` — reach Meilisearch over `127.0.0.1:7701`, so nothing has to be
exposed on a public interface and no reverse proxy is involved. That is the whole reason the
key never leaves the box.

**Memory is the contended resource, and the docs build is the spike.** `build-and-deploy.sh`
already raises the Node heap to 8 GB and warns below 9 GB of RAM; Meilisearch now sits
alongside that, resident, plus the NLM JVM. `MEILI_MAX_INDEXING_MEMORY: 1Gb` in the compose
file caps the indexing batch specifically so a re-index during a build cannot race the build
for the last gigabyte. If the OOM killer starts appearing, that ceiling is the first knob to
lower — not the Node heap, which is already sized to a measured peak.

Note the push runs *after* the rsync and before the cache eviction, so a failed push leaves
the newly deployed site searching the previous index rather than a half-written one.

## Indexing

```bash
cd ..
node scripts/push-search-index.mjs --dry-run   # validate the transform, write nothing
node scripts/push-search-index.mjs             # needs MEILI_MASTER_KEY
```

Currently 1598 pages → **19,203 documents**, one per page section, so results land on the
right heading anchor rather than the top of a long page.

The push builds into `namaerp-docs_staging` and swaps atomically, so a failed or partial
run can never leave the live site searching half an index.

### Fields

| Field                          | Purpose |
|--------------------------------|---------|
| `pageTitle`, `header`, `content` | Searchable, **in this order** — the order *is* the weighting (Meilisearch's `attribute` ranking rule), so a title match beats a passing mention in prose. |
| `pathLocale`, `hasCounterpart`   | Filter implementing the locale rule: Arabic readers get Arabic pages **plus root-only content**, so the English-only entity-flows stay findable. Mirrors `DocsSearchEngine.pageMatchesLocale`. |
| `section`                        | `modules`, `platform`, `entity-flows`, … — lets the 233 AI-generated entity-flow pages be pushed down or hidden. |
| `indices`                        | Which of the named indices (`videos`, `entity-flows`, `release-notes`) a page belongs to; preserves the existing "search in" selector off a single index. |

## Judging relevance

`MEILI_ENV: production` disables Meilisearch's bundled search-preview UI. To eyeball
results by hand, flip it to `development` in `docker-compose.yaml`, `docker compose up -d`,
and open <http://127.0.0.1:7701>. **Put it back** — development mode accepts writes with no
key.

Or query the servlet directly:

```bash
curl -s http://127.0.0.1:7701/indexes/namaerp-docs/search \
  -H "Authorization: Bearer $MEILI_MASTER_KEY" \
  -H 'Content-Type: application/json' \
  -d '{"q":"فاتورة مبيعات","limit":5,"filter":"(pathLocale = \"/ar/\" OR hasCounterpart = false)"}' \
  | jq '.hits[] | {path, pageTitle, header}'
```

Arabic goes through charabia, which carries an Arabic normaliser (tashkeel stripping, alef
folding) — the same job the hand-written `processTerm` in `config.mts` was doing. It is the
part of this change with the least evidence behind it, so throw real Arabic queries at it
early.

The site now depends on this: the docs search box defaults to `meili` and the VitePress
built-in provider is gone. If `meili.key` is unset or the instance is down, `DocsSearchEngine`
falls back to Lucene, so search degrades rather than breaking — but it degrades to exactly
the engine this change was meant to replace. Watch for that quietly happening.

## Upgrading

Bump the pinned `getmeili/meilisearch:vX.Y` in `docker-compose.yaml` and nothing else. Do
not move to `:latest` — on 2026-07-23 that left the ask stack two releases behind with no
visible sign. Check the release notes first: a major version may need a dump/restore rather
than an in-place restart. After any upgrade that resets storage, just re-run the push.

.
