import { useBaseTheme } from '@/hooks/@CodeMirror/useBaseTheme'
import { useJsonStyle } from '@/hooks/@CodeMirror/useJsonStyle'
import { useBoundStore } from '@/store'
import { json } from '@codemirror/lang-json'
import { Box } from '@mui/material'
import CodeMirror from '@uiw/react-codemirror'

export default function QueryResponse() {
  const baseTheme = useBaseTheme()
  const jsonStyleExtension = useJsonStyle()
  const queryResponse = useBoundStore((state) => state.stringifiedResponse)

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
        value={queryResponse}
        readOnly
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
