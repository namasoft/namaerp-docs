// Shiki (TextMate) grammar for ```fieldmap fences: the entity-flow field maps parsed by
// EAGenerateEntityFromEntityAction.createFieldsMap (infra/domain-base) — keep the two in step.
// A field map is line based: "target=source", a "#" comment (only when # starts the line; a # later on
// the line is part of the value), or the ")endX" line that closes a block.

const BLOCK_STARTS = 'switchTarget|switchSource|matchLinesBy|filterLinesBy'
const SPECIAL_TARGETS = `${BLOCK_STARTS}|filterSourceDetail|filterSourceBy|filterTargetDetail|filterTargetBy|runCommand|selectLine|addDiscussion|enableDetailSqlFields`
const SQL_FUNCTIONS = 'sql|totalizesql|maxsql|minsql|runningtotalsql|removelinesmatchingsql|removelinesnotmatchingsql'
const ML_SQL = 'mlsql|mlremovelinesmatchingsql|mlremovelinesnotmatchingsql'

const TARGET = '^\\s*(?![#)])([^=\\n]+?)\\s*(=)'
const TO_END_OF_LINE = {
    end: '(\\))?\\s*$',
    endCaptures: {1: {name: 'punctuation.definition.arguments.end.fieldmap'}}
}

const assignmentCaptures = {
    1: {patterns: [{include: '#target'}]},
    2: {name: 'keyword.operator.assignment.fieldmap'}
}

const multiLine = (functions: string, body: string) => ({
    name: 'meta.multiline.fieldmap',
    begin: `(?i)${TARGET}\\s*(${functions})(\\()`,
    beginCaptures: {
        ...assignmentCaptures,
        3: {name: 'entity.name.function.fieldmap'},
        4: {name: 'punctuation.definition.arguments.begin.fieldmap'}
    },
    end: `(?i)(\\))\\s*(end(?:${functions}))\\b`,
    endCaptures: {
        1: {name: 'punctuation.definition.arguments.end.fieldmap'},
        2: {name: 'keyword.control.end.fieldmap'}
    },
    patterns: [{include: body}]
})

export const fieldMapGrammar = {
    name: 'fieldmap',
    scopeName: 'source.fieldmap',
    aliases: ['fieldsmap'],
    embeddedLangs: ['sql'],
    patterns: [
        {include: '#comment'},
        {include: '#block-end'},
        multiLine(ML_SQL, '#sql-body'),
        multiLine('mltempo', '#tempo-body'),
        {
            name: 'meta.assignment.fieldmap',
            begin: TARGET,
            beginCaptures: assignmentCaptures,
            end: '$',
            patterns: [{include: '#value'}]
        },
        {include: '#value'}
    ],
    repository: {
        comment: {
            name: 'comment.line.number-sign.fieldmap',
            match: '^\\s*#.*$'
        },
        'block-end': {
            match: `(?i)(\\))\\s*(end(?:${BLOCK_STARTS}))\\b`,
            captures: {
                1: {name: 'punctuation.section.block.end.fieldmap'},
                2: {name: 'keyword.control.end.fieldmap'}
            }
        },
        target: {
            patterns: [
                {match: `(?i)\\b(?:${SPECIAL_TARGETS})\\b`, name: 'keyword.control.fieldmap'},
                {match: '\\$\\w+', name: 'variable.language.fieldmap'},
                {match: '\\.', name: 'punctuation.accessor.fieldmap'},
                {match: '[^\\s.$]+', name: 'entity.name.tag.fieldmap'}
            ]
        },
        value: {
            patterns: [
                {
                    begin: `(?i)\\b(${SQL_FUNCTIONS})(\\()`,
                    beginCaptures: {
                        1: {name: 'entity.name.function.fieldmap'},
                        2: {name: 'punctuation.definition.arguments.begin.fieldmap'}
                    },
                    ...TO_END_OF_LINE,
                    patterns: [{include: '#sql-body'}]
                },
                {
                    begin: '(?i)\\b(tempo)(\\()',
                    beginCaptures: {
                        1: {name: 'entity.name.function.fieldmap'},
                        2: {name: 'punctuation.definition.arguments.begin.fieldmap'}
                    },
                    ...TO_END_OF_LINE,
                    patterns: [{include: '#tempo-body'}]
                },
                {
                    // the condition of totalizeif(collection, field, select …)
                    begin: '(?i)(?=\\bselect\\b)',
                    end: '(?=\\)?\\s*$)',
                    patterns: [{include: '#sql-body'}]
                },
                {include: '#sql-parameter'},
                {name: 'string.quoted.double.fieldmap', match: '"(?:[^"\\\\]|\\\\.)*"'},
                {name: 'string.quoted.single.fieldmap', match: "'(?:[^'\\\\]|\\\\.)*'"},
                {name: 'constant.numeric.fieldmap', match: '\\b\\d+(?:\\.\\d+)?\\b'},
                {name: 'constant.language.fieldmap', match: '(?i)\\b(?:true|false|null|clear)\\b'},
                // a "(" that ends the line opens a block (switchTarget=customer( …), it is not a call
                {name: 'entity.name.function.fieldmap', match: '\\b[A-Za-z_]\\w*(?=\\((?!\\s*$))'},
                {include: '#field-path'},
                {name: 'keyword.operator.fieldmap', match: '='},
                {name: 'punctuation.separator.comma.fieldmap', match: ','}
            ]
        },
        'field-path': {
            patterns: [
                {match: '(\\.)(\\$\\w+)', captures: {1: {name: 'punctuation.accessor.fieldmap'}, 2: {name: 'support.function.modifier.fieldmap'}}},
                {match: '\\$\\w+', name: 'variable.language.fieldmap'},
                {match: '\\.', name: 'punctuation.accessor.fieldmap'},
                {match: '[A-Za-z_]\\w*', name: 'variable.field.fieldmap'}
            ]
        },
        // {details.n1}, {!tableName}, {xIN,customer_id,ids}, {[xBetween],code,from,to}, {x>=,amount,minAmount}
        'sql-parameter': {
            match: '(\\{)([^{}\\n]+)(\\})',
            captures: {
                1: {name: 'punctuation.definition.parameter.begin.fieldmap'},
                2: {
                    patterns: [
                        {match: '(?<=\\{)!', name: 'keyword.operator.literal.fieldmap'},
                        {match: '(?<=\\{)\\[?x(?:IN|Between|[<>=!]+)\\]?(?=,)', name: 'keyword.control.parameter.fieldmap'},
                        {match: ',', name: 'punctuation.separator.comma.fieldmap'},
                        {match: '\\(\\d+\\)', name: 'constant.numeric.fieldmap'},
                        {include: '#field-path'}
                    ]
                },
                3: {name: 'punctuation.definition.parameter.end.fieldmap'}
            }
        },
        'sql-body': {
            patterns: [{include: '#sql-parameter'}, {include: 'source.sql'}]
        },
        'tempo-body': {
            patterns: [{include: 'text.html.tempo#tempo'}]
        }
    }
}
