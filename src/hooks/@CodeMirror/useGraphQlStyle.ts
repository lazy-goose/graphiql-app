import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags } from '@lezer/highlight'

// Tags: https://github.com/graphql/graphiql/blob/main/packages/cm6-graphql/src/language.ts

export const useGraphQlStyle = () => {
  const colors = {
    variable: '#6c6bd4',
    string: '#e535ab',
    definition: '#e535ab',
    unquoted: '#13c913',
    nullish: '#919193',
    atom: '#009fb8',
    property: '#007deb',
    comment: '#23232799',
    default: '#232327',
  }
  const graphQlHighlight = HighlightStyle.define([
    { tag: tags.variableName, color: colors.variable },
    { tag: tags.string, color: colors.string },
    { tag: tags.bool, color: colors.unquoted },
    { tag: tags.integer, color: colors.unquoted },
    { tag: tags.float, color: colors.unquoted },
    { tag: tags.null, color: colors.nullish },
    { tag: tags.definitionKeyword, color: colors.definition },
    { tag: tags.keyword, color: colors.definition },
    { tag: tags.atom, color: colors.atom },
    { tag: tags.attributeName, color: colors.atom },
    { tag: tags.propertyName, color: colors.property },
    { tag: tags.special(tags.name), color: colors.variable },
    { tag: tags.lineComment, color: colors.comment },
    { tag: tags.paren, color: colors.default },
    { tag: tags.brace, color: colors.default },
    { tag: tags.separator, color: colors.default },
    { tag: tags.modifier, color: colors.default },
  ])
  return syntaxHighlighting(graphQlHighlight)
}
