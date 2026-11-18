// Shiki (TextMate) grammar for ```tempo fences. The keyword lists mirror the ERP's own Monaco editor,
// infra/gui2/src/main/vue/src/utils/common/TempoLanguageConfig.ts — keep the two in step.
// Templates are mostly HTML or URLs with {…} tags in them, so the HTML grammar runs underneath and the
// tempo tags are injected everywhere, even inside attribute values. Tags may also be written %{…}%, the form
// templates that start with <useCSSFriendlyBrackets/> use.

const words = (...list: string[]) => list.join('|')

const END_KEYWORDS = 'end\\w*'
const CONDITIONALS = words('if<=', 'if<', 'if>=', 'if>', 'if=', 'if!=', 'if!', 'ifnumber<=', 'ifnumber<', 'ifnumber>=',
    'ifnumber>', 'ifnumber=', 'ifnumber!=', 'ifnot', 'ifequal', 'ifnotequal', 'iflessoreq', 'ifless',
    'ifgreateroreq', 'ifgreater', 'ifnumbernotequal', 'ifnumbernot', 'ifnumberequal', 'ifnumberlessoreq',
    'ifnumberless', 'ifnumbergreateroreq', 'ifnumbergreater', 'ifnumber', 'if', 'loop')
const BLOCK_KEYWORDS = words('else', 'table', 'opentable', 'closetable', 'row', 'cell', 'msg', 'openmsg', 'closemsg',
    'sendto', 'subject', 'approvelink', 'rejectlink', 'returnlink', 'escalatelink', 'escalatetodirectsupervisorlink',
    'returntoprevioussteplink', 'httprequest', 'headername', 'headervalue', 'bodypartname', 'bodypartvalue', 'paramname', 'paramvalue',
    'fullbody', 'requestmethod', 'contenttype', 'charset', 'requestdescription1', 'requestdescription2',
    'requestrelatedtoid1', 'requestrelatedtoid2', 'requesturl', 'listviewlink', 'listcriteria')
const DIRECTIVES = words('tempo', 'enter', 'directlinks', 'openinnewwindow', 'newwindow', 'shortlinks', 'plainlinks',
    'usenewguiforlinks', 'dynamiccriteria', 'creatorvalue', '@rownumber')
const BLOCK_FUNCTIONS = words('creator', 'callguiaction', 'header', 'footer', 'listviewlink', 'bodypart',
    'approvelink', 'rejectlink', 'returnlink', 'escalatelink', 'escalatetodirectsupervisorlink', 'returntoprevioussteplink')
const FIELD_FUNCTIONS = words('f', 'v', 'r')

const IDENTIFIER = '[A-Za-z_$][\\w$#]*'
const OPEN = '(%?\\{)'
const CLOSE = '(\\}%?)'

const tag = (keywords: string, scope: string) => ({
    match: `(?i)${OPEN}(${keywords})${CLOSE}`,
    captures: {
        1: {name: 'punctuation.definition.tag.begin.tempo'},
        2: {name: scope},
        3: {name: 'punctuation.definition.tag.end.tempo'}
    }
})

const call = (functions: string, scope: string) => ({
    name: 'meta.tag.call.tempo',
    begin: `(?i)${OPEN}(${functions})(\\()`,
    beginCaptures: {
        1: {name: 'punctuation.definition.tag.begin.tempo'},
        2: {name: scope},
        3: {name: 'punctuation.definition.arguments.begin.tempo'}
    },
    end: `(\\))?\\s*${CLOSE}`,
    endCaptures: {
        1: {name: 'punctuation.definition.arguments.end.tempo'},
        2: {name: 'punctuation.definition.tag.end.tempo'}
    },
    patterns: [{include: '#arguments'}]
})

export const tempoGrammar = {
    name: 'tempo',
    scopeName: 'text.html.tempo',
    aliases: ['tmp'],
    embeddedLangs: ['html'],
    patterns: [{include: 'text.html.basic'}],
    injections: {
        'L:text.html.tempo - meta.tag.tempo - meta.tag.call.tempo - comment.block.tempo': {
            patterns: [{include: '#tempo'}]
        }
    },
    repository: {
        tempo: {
            patterns: [
                {include: '#comment'},
                tag(END_KEYWORDS, 'keyword.control.end.tempo'),
                tag(BLOCK_KEYWORDS, 'keyword.control.tempo'),
                tag(DIRECTIVES, 'storage.modifier.directive.tempo'),
                call(`(?:else\\s+)?(?:${CONDITIONALS})`,'keyword.control.conditional.tempo'),
                call(BLOCK_FUNCTIONS, 'keyword.control.tempo'),
                call(FIELD_FUNCTIONS, 'support.function.field.tempo'),
                call('[A-Za-z_][\\w]*', 'entity.name.function.tempo'),
                {include: '#field-reference'}
            ]
        },
        comment: {
            name: 'comment.block.tempo',
            begin: '(?i)%?\\{comment\\}%?',
            end: '(?i)%?\\{endcomment\\}%?'
        },
        'field-reference': {
            name: 'meta.tag.tempo',
            match: `${OPEN}(#?)(${IDENTIFIER}(?:\\.${IDENTIFIER})*)${CLOSE}`,
            captures: {
                1: {name: 'punctuation.definition.tag.begin.tempo'},
                2: {name: 'punctuation.definition.tag.begin.tempo'},
                3: {patterns: [{include: '#field-path'}]},
                4: {name: 'punctuation.definition.tag.end.tempo'}
            }
        },
        'field-path': {
            patterns: [
                {match: '\\.', name: 'punctuation.accessor.tempo'},
                {match: '#', name: 'punctuation.separator.tempo'},
                {match: IDENTIFIER.replace('#', ''), name: 'variable.field.tempo'}
            ]
        },
        arguments: {
            patterns: [
                {name: 'string.quoted.double.tempo', match: '"(?:[^"\\\\]|\\\\.)*"'},
                {name: 'string.quoted.single.tempo', match: "'(?:[^'\\\\]|\\\\.)*'"},
                {name: 'constant.numeric.tempo', match: '\\b\\d+(?:\\.\\d+)?\\b'},
                {name: 'constant.language.tempo', match: '(?i)\\b(?:true|false)\\b'},
                {name: 'entity.other.attribute-name.tempo', match: `${IDENTIFIER}(?=\\s*=)`},
                {name: 'keyword.operator.tempo', match: '='},
                {name: 'punctuation.separator.comma.tempo', match: ','},
                {include: '#field-path'}
            ]
        }
    }
}
