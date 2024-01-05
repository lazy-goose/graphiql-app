import { useCodeMirrorJsonStyles } from '@/hooks/useCodeMirrorJsonStyles'
import { json } from '@codemirror/lang-json'
import { Box } from '@mui/material'
import CodeMirror from '@uiw/react-codemirror'

import '@fontsource/source-code-pro'

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
  const jsonHighlightExtensions = useCodeMirrorJsonStyles()

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
