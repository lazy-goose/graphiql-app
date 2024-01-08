import { getApiResponse } from '@/API'
import { useBaseTheme } from '@/hooks/@CodeMirror/useBaseTheme'
import { useGraphQlStyle } from '@/hooks/@CodeMirror/useGraphQlStyle'
import { useEnqueueSnackbar } from '@/hooks/useEnqueueSnackbar'
import { useLocale } from '@/hooks/useLocale'
import { useBoundStore } from '@/store'
import { getHeadersObject } from '@/utils/getHeadersObject'
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
  const queryVariables = useBoundStore((state) => state.stringifiedVariables)
  const queryHeaders = useBoundStore((state) => state.headers)
  const baseUrl = useBoundStore((state) => state.baseUrl)
  const changeResponse = useBoundStore((state) => state.changeResponse)
  const { pushSnackbar } = useEnqueueSnackbar()
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
        pushSnackbar({ message: 'Unable to prettify query' })
      }
    }
  }
  const handleRunButtonClick = () => {
    getApiResponse(
      baseUrl,
      queryInput,
      getHeadersObject(queryHeaders),
      queryVariables,
    ).then(
      (result) => changeResponse(result),
      (error: Error) => pushSnackbar({ message: error.message }),
    )
  }

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
          {mainPage.button.prettify}
        </Button>
        <Button
          startIcon={<PlayArrowRounded viewBox="5 5 15 15" />}
          variant="contained"
          onClick={handleRunButtonClick}
        >
          {mainPage.button.run}
        </Button>
      </Stack>
    </Box>
  )
}
