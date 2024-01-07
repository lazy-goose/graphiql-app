import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags } from '@lezer/highlight'

export const useJsonStyle = () => {
  const colors = {
    unquoted: '#13c913',
    string: '#ff32c6',
    property: '#0286fe',
    nullish: '#919193',
    default: '#232327',
  }
  const jsonHighlight = HighlightStyle.define([
    { tag: tags.string, color: colors.string },
    { tag: tags.number, color: colors.unquoted },
    { tag: tags.bool, color: colors.unquoted },
    { tag: tags.propertyName, color: colors.property },
    { tag: tags.null, color: colors.nullish },
    { tag: tags.separator, color: colors.default },
    { tag: tags.brace, color: colors.default },
    { tag: tags.squareBracket, color: colors.default },
  ])
  return syntaxHighlighting(jsonHighlight)
}
