import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags } from '@lezer/highlight'
import { EditorView } from '@uiw/react-codemirror'

export const useCodeMirrorJsonStyles = () => {
  const colors = {
    unquoted: '#13c913',
    string: '#ff32c6',
    property: '#0286fe',
    nullish: '#919193',
    default: '#232327',
    background: '#ffffff',
    gutter: '#a0a0a0',
    selection: '#2196f322',
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
  const jsonTheme = EditorView.theme({
    '&': {
      fontFamily: 'Source Code Pro, sans-serif',
      fontSize: '1rem',
    },
    '.cm-gutters': {
      color: colors.gutter,
      background: colors.background,
      border: 'none',
    },
    '.cm-content': {
      color: colors.default,
    },
    '.cm-foldPlaceholder': {
      color: colors.property,
      border: 'none',
      background: 'none',
    },
    '.cm-selectionBackground': {
      background: colors.selection,
    },
  })
  return [syntaxHighlighting(jsonHighlight), jsonTheme]
}
