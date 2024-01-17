import { useLocale } from '@/hooks/useLocale'
import { useBoundStore } from '@/store'
import { Refresh } from '@mui/icons-material'
import {
  Button,
  Stack,
  TextField,
  type StackProps,
  type Theme,
} from '@mui/material'
import { useState } from 'react'

export default function SchemaControls(
  props: StackProps & {
    variant?: 'desktop' | 'mobile'
  },
) {
  const { variant = 'desktop', ...passStackProps } = props
  const defaultUrl = useBoundStore((state) => state.defaultUrl)
  const baseUrl = useBoundStore((state) => state.baseUrl)
  const fetchSchema = useBoundStore((state) => state.fetchSchema)
  const [urlInput, setUrlInput] = useState(baseUrl)
  const {
    locale: { header },
  } = useLocale()

  const schemaError = useBoundStore((state) => state.schemaError)
  const isSchemaFetching = useBoundStore((state) => state.isSchemaFetching)

  const indicatorColor = (theme: Theme) => {
    if (isSchemaFetching) {
      return theme.palette.text.secondary
    }
    if (schemaError) {
      return theme.palette.error.main
    }
    return theme.palette.success.main
  }

  const loadingAnimation = (name = 'loading') => {
    const animationFrames = Object.fromEntries(
      ['○', '◔', '◑', '◕', '●'].map((sym, index, { length }) => [
        (index / (length - 1)) * 100 + '%',
        { content: `"${sym}"` },
      ]),
    )
    return {
      [`@keyframes ${name}`]: animationFrames,
    }
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        fetchSchema(urlInput)
      }}
    >
      <Stack
        direction="row"
        mx={1.5}
        gap={1}
        alignItems="center"
        {...passStackProps}
      >
        <TextField
          label="Endpoint"
          variant="standard"
          size="small"
          value={urlInput}
          onChange={(e) => setUrlInput(e.currentTarget.value)}
          sx={{
            ...(variant === 'desktop' && {
              maxWidth: 'min(36ch, 100%)',
            }),
            flex: 1,
          }}
          placeholder={defaultUrl}
          InputLabelProps={{
            shrink: true,
            sx: (theme) => ({
              '&.MuiFormLabel-root': {
                color: indicatorColor(theme),
                '&::before': {
                  content: '"●"',
                  marginRight: 1,
                  animation: isSchemaFetching
                    ? 'loading infinite 1s'
                    : undefined,
                },
                ...loadingAnimation('loading'),
              },
            }),
          }}
        />
        <Button
          type="submit"
          disabled={isSchemaFetching}
          variant="outlined"
          startIcon={<Refresh viewBox="2 2 21 21" />}
          sx={{
            flexShrink: 0,
            alignSelf: variant === 'mobile' ? 'end' : null,
          }}
        >
          {header.button.refetch}
        </Button>
      </Stack>
    </form>
  )
}
