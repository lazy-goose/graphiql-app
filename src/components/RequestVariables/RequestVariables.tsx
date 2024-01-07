import { useBaseTheme } from '@/hooks/@CodeMirror/useBaseTheme'
import { useJsonStyle } from '@/hooks/@CodeMirror/useJsonStyle'
import { useBoundStore } from '@/store'
import { json, jsonParseLinter } from '@codemirror/lang-json'
import { lintGutter, linter } from '@codemirror/lint'
import { Box } from '@mui/material'
import CodeMirror from '@uiw/react-codemirror'

export default function RequestVariables() {
  const baseTheme = useBaseTheme()
  const jsonStyleExtension = useJsonStyle()

  const stringifiedVariables = useBoundStore(
    (state) => state.stringifiedVariables,
  )
  const setStringifiedVariables = useBoundStore(
    (state) => state.setStringifiedVariables,
  )

  return (
    <Box
      height={1}
      sx={(theme) => ({
        '> *': {
          height: 1,
        },
        boxSizing: 'border-box',
        padding: 2,
        position: 'relative',
        '.jsonLabel': {
          boxSizing: 'border-box',
          height: 'auto',
          pt: '24px',
          pb: 0.5,
          pr: 2,
          pl: 0.5,
          position: 'absolute',
          top: 0,
          right: 0,
          fontFamily: theme.typography.body2,
          lineHeight: 1,
          textAlign: 'center',
          background: theme.palette.background.paper,
        },
      })}
    >
      <CodeMirror
        height="100%"
        value={stringifiedVariables}
        extensions={[
          json(),
          linter(jsonParseLinter()),
          lintGutter(),
          baseTheme,
          jsonStyleExtension,
        ]}
        basicSetup={{
          highlightActiveLine: false,
          foldGutter: false,
        }}
        onChange={setStringifiedVariables}
      />
      <Box className="jsonLabel">JSON</Box>
    </Box>
  )
}
