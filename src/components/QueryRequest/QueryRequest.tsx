import { useBaseTheme } from '@/hooks/@CodeMirror/useBaseTheme'
import { useGraphQlStyle } from '@/hooks/@CodeMirror/useGraphQlStyle'
import { useLocale } from '@/hooks/useLocale'
import { useBoundStore } from '@/store'
import { queryPrettify } from '@/utils/queryPrettify'
import { diagnosticCount } from '@codemirror/lint'
import { FormatIndentIncrease, PlayArrowRounded } from '@mui/icons-material'
import { Box, Button, Stack } from '@mui/material'
import CodeMirror from '@uiw/react-codemirror'
import { graphql as cm6graphql } from 'cm6-graphql'
import { useSnackbar } from 'notistack'
import { useRef } from 'react'

export default function QueryRequest() {
  const schema = undefined
  const queryInput = useBoundStore((state) => state.stringifiedQuery)
  const isResponseFetching = useBoundStore((state) => state.isResponseFetching)
  const setQueryInput = useBoundStore((state) => state.setStringifiedQuery)
  const fetchResponse = useBoundStore((state) => state.fetchQueryResponse)
  const { enqueueSnackbar } = useSnackbar()
  const {
    locale: { mainPage },
  } = useLocale()

  const lintErrorsRef = useRef(0)

  const baseTheme = useBaseTheme()
  const graphQlStyleExtension = useGraphQlStyle()

  const handlePrettifyButtonClick = () => {
    if (!lintErrorsRef.current) {
      try {
        setQueryInput(queryPrettify(queryInput))
      } catch {
        enqueueSnackbar({
          variant: 'customAlert',
          message: mainPage.error.prettify,
        })
      }
    }
  }

  const handleRunButtonClick = () => {
    fetchResponse()
  }

  return (
    <Box
      height={1}
      sx={{
        boxSizing: 'border-box',
        padding: 2,
        position: 'relative',
        '> :has(.cm-editor)': {
          display: 'contents',
        },
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
          {mainPage.button.prettify}
        </Button>
        <Button
          startIcon={<PlayArrowRounded viewBox="5 5 15 15" />}
          variant="contained"
          onClick={handleRunButtonClick}
          sx={{
            pointerEvents: isResponseFetching ? 'none' : undefined,
          }}
        >
          {mainPage.button.run}
        </Button>
      </Stack>
    </Box>
  )
}
