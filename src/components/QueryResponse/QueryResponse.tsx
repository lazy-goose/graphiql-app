import { useBaseTheme } from '@/hooks/@CodeMirror/useBaseTheme'
import { useJsonStyle } from '@/hooks/@CodeMirror/useJsonStyle'
import { useBoundStore } from '@/store'
import { json } from '@codemirror/lang-json'
import { Box } from '@mui/material'
import CodeMirror from '@uiw/react-codemirror'
import { Loader } from '../Loader'
import ResponseMetrics from './ResponseMetrics'

export default function QueryResponse() {
  const baseTheme = useBaseTheme()
  const jsonStyleExtension = useJsonStyle()
  const queryResponse = useBoundStore((state) => state.stringifiedResponse)
  const isResponseFetching = useBoundStore((state) => state.isResponseFetching)

  const padding = 2

  return (
    <Box
      height={1}
      sx={{
        overflow: 'hidden',
        boxSizing: 'border-box',
        padding,
        position: 'relative',
        '> :has(.cm-editor)': {
          display: 'contents',
        },
      }}
    >
      <ResponseMetrics
        noHeight
        sx={{
          width: 'max-content',
          position: 'sticky',
          marginLeft: 'auto',
          right: 18,
          zIndex: 1,
          backgroundColor: '#ffffff88',
        }}
      />
      {isResponseFetching ? (
        <Loader />
      ) : (
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
      )}
    </Box>
  )
}
