import { useBaseTheme } from '@/hooks/@CodeMirror/useBaseTheme'
import { useJsonStyle } from '@/hooks/@CodeMirror/useJsonStyle'
import { useBoundStore } from '@/store'
import { json } from '@codemirror/lang-json'
import { Box } from '@mui/material'
import CodeMirror from '@uiw/react-codemirror'
import ResponseMetrics from './ResponseMetrics'

export default function QueryResponse() {
  const baseTheme = useBaseTheme()
  const jsonStyleExtension = useJsonStyle()
  const queryResponse = useBoundStore((state) => state.stringifiedResponse)

  const padding = 2

  return (
    <Box
      minHeight={1}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '* > .cm-editor': {
          display: 'contents',
        },
        '.cm-editor': {
          flex: 1,
        },
        boxSizing: 'border-box',
        padding,
        position: 'relative',
      }}
    >
      <ResponseMetrics
        noHeight
        sx={(theme) => ({
          position: 'sticky',
          marginLeft: 'auto',
          top: theme.spacing(padding + 0.45),
          zIndex: 1,
          backgroundColor: '#ffffff88',
        })}
      />
      <CodeMirror
        height="100%"
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
