import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags } from '@lezer/highlight'

export const useGraphQlStyle = () => {
  const colors = {
    variable: '#13c913',
    definition: '#ff005c',
    unquoted: '#13c913',
    vivid: '#ff32c6',
    nullish: '#919193',
    property: '#0286fe',
    default: '#232327',
  }
  const graphQlHighlight = HighlightStyle.define([
    { tag: tags.variableName, color: colors.variable },
    { tag: tags.bool, color: colors.unquoted },
    { tag: tags.string, color: colors.vivid },
    { tag: tags.integer, color: colors.unquoted },
    { tag: tags.float, color: colors.unquoted },
    { tag: tags.null, color: colors.nullish },
    { tag: tags.definitionKeyword, color: colors.definition },
    { tag: tags.atom, color: colors.property },
    { tag: tags.propertyName, color: colors.property },
    { tag: tags.attributeName, color: colors.vivid },

    { tag: tags.lineComment, color: colors.default },
    { tag: tags.paren, color: colors.default },
    { tag: tags.brace, color: colors.default },
    { tag: tags.separator, color: colors.default },
    { tag: tags.modifier, color: colors.default },
    { tag: tags.special(tags.name), color: colors.default },
    { tag: tags.keyword, color: colors.default },
  ])
  return syntaxHighlighting(graphQlHighlight)
}
