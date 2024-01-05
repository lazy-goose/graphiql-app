import { useCodeMirrorJsonStyles } from '@/hooks/useCodeMirrorJsonStyles'
import { useBoundStore } from '@/store'
import { json, jsonParseLinter } from '@codemirror/lang-json'
import { lintGutter, linter } from '@codemirror/lint'
import { Box } from '@mui/material'
import CodeMirror, { type Extension } from '@uiw/react-codemirror'

const baseJsonExtensions = [
  json(),
  linter(jsonParseLinter()),
  lintGutter(),
] satisfies Extension[]

export default function RequestVariables() {
  const jsonHighlightExtensions = useCodeMirrorJsonStyles({
    autoHideLintGutter: true,
  })
  const stringifiedVariables = useBoundStore(
    (state) => state.stringifiedVariables,
  )
  const setStringifiedVariables = useBoundStore(
    (state) => state.setStringifiedVariables,
  )
  const jsonLabelSize = '50px'
  return (
    <Box
      height={1}
      sx={(theme) => ({
        position: 'relative',
        boxSizing: 'border-box',
        padding: 2,
        '& > *:first-of-type': {
          height: 1,
        },
        '.cm-editor.cm-focused': {
          outlineColor: 'transparent',
        },
        '.cm-content > .cm-line:first-of-type': {
          paddingRight: jsonLabelSize,
        },
        '.jsonLabel': {
          width: jsonLabelSize,
          boxSizing: 'border-box',
          padding: 0.5,
          paddingTop: 2.5,
          position: 'absolute',
          top: 0,
          right: 0,
          fontFamily: theme.typography.body2,
          textAlign: 'center',
          background: theme.palette.background.paper,
        },
      })}
    >
      <CodeMirror
        height="100%"
        value={stringifiedVariables}
        extensions={[...baseJsonExtensions, ...jsonHighlightExtensions]}
        onChange={setStringifiedVariables}
      />
      <Box className="jsonLabel">JSON</Box>
    </Box>
  )
}
