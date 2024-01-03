import { Box } from '@mui/material'

import { json } from '@codemirror/lang-json'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags } from '@lezer/highlight'
import CodeMirror, { EditorView } from '@uiw/react-codemirror'

import '@fontsource/source-code-pro'

const useJsonStyles = () => {
  const colors = {
    unquoted: '#38e162',
    string: '#ff32c6',
    property: '#3fa4ff',
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

const exampleData = JSON.stringify(
  {
    data: {
      countries: [
        {
          id: 3,
          name: 'Andorra',
        },
        {
          name: 'United Arab Emirates',
        },
        // ...
        {
          name: 'Zimbabwe',
        },
      ],
    },
  },
  null,
  2,
)

export default function Response() {
  const jsonHighlightExtensions = useJsonStyles()

  return (
    <Box
      height={1}
      sx={{
        boxSizing: 'border-box',
        padding: 2,
        '& > *:first-of-type': {
          height: 1,
        },
        '.cm-editor': {
          height: 1,
        },
        '.cm-line': {
          paddingLeft: 1,
        },
      }}
    >
      <CodeMirror
        editable={false}
        value={exampleData}
        extensions={[json(), ...jsonHighlightExtensions]}
        basicSetup={{
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
          highlightSelectionMatches: false,
        }}
      />
    </Box>
  )
}
