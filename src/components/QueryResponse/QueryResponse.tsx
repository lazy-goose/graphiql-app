import { useBaseTheme } from '@/hooks/@CodeMirror/useBaseTheme'
import { useJsonStyle } from '@/hooks/@CodeMirror/useJsonStyle'
import { json } from '@codemirror/lang-json'
import { Box } from '@mui/material'
import CodeMirror from '@uiw/react-codemirror'

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

export default function QueryResponse() {
  const baseTheme = useBaseTheme()
  const jsonStyleExtension = useJsonStyle()

  return (
    <Box
      height={1}
      padding={2}
      boxSizing="border-box"
      sx={{
        '> *': { height: 1 },
      }}
    >
      <CodeMirror
        editable={false}
        value={exampleData}
        extensions={[json(), baseTheme, jsonStyleExtension]}
        basicSetup={{
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
          highlightSelectionMatches: false,
        }}
      />
    </Box>
  )
}
