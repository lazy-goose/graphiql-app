import { useBaseTheme } from '@/hooks/@CodeMirror/useBaseTheme'
import { useGraphQlStyle } from '@/hooks/@CodeMirror/useGraphQlStyle'
import { useBoundStore } from '@/store'
import { queryPrettify } from '@/utils/queryPrettify'
import { diagnosticCount } from '@codemirror/lint'
import { FormatIndentIncrease, PlayArrowRounded } from '@mui/icons-material'
import { Box, Button, Stack } from '@mui/material'
import CodeMirror from '@uiw/react-codemirror'
import { graphql as cm6graphql } from 'cm6-graphql'
import { useRef } from 'react'

export default function QueryRequest() {
  const schema = undefined
  const queryInput = useBoundStore((state) => state.stringifiedQuery)
  const setQueryInput = useBoundStore((state) => state.setStringifiedQuery)

  const lintErrorsRef = useRef(0)

  const baseTheme = useBaseTheme()
  const graphQlStyleExtension = useGraphQlStyle()

  const handlePrettifyButtonClick = () => {
    if (!lintErrorsRef.current) {
      try {
        setQueryInput(queryPrettify(queryInput))
      } catch {
        console.error('Unable to prettify query')
      }
    }
  }
  const handleRunButtonClick = () => {}

  return (
    <Box
      height={1}
      sx={{
        boxSizing: 'border-box',
        padding: 2,
        position: 'relative',
        '> *:has(.cm-editor)': { height: 1 },
      }}
    >
      <CodeMirror
        value={queryInput}
        onChange={setQueryInput}
        extensions={[cm6graphql(schema), baseTheme, graphQlStyleExtension]}
        onUpdate={(cm) => {
          lintErrorsRef.current = diagnosticCount(cm.state)
        }}
        basicSetup={{
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
          highlightSelectionMatches: false,
        }}
      />
      <Stack
        direction="row"
        gap={1}
        sx={{
          position: 'absolute',
          top: 15,
          right: 0,
          zIndex: 1,
        }}
      >
        <Button
          startIcon={<FormatIndentIncrease />}
          variant="outlined"
          sx={(theme) => ({
            '&, &:hover': {
              background: theme.palette.background.paper,
            },
          })}
          onClick={handlePrettifyButtonClick}
        >
          Prettify
        </Button>
        <Button
          startIcon={<PlayArrowRounded viewBox="5 5 15 15" />}
          variant="contained"
          onClick={handleRunButtonClick}
        >
          Run
        </Button>
      </Stack>
    </Box>
  )
}
