import { useLocale } from '@/hooks/useLocale'
import { useBoundStore } from '@/store'
import { Add } from '@mui/icons-material'
import { Box, Button, Stack } from '@mui/material'
import HeaderControl from './HeaderControl'

export default function RequestHeaders() {
  const headers = useBoundStore((state) => state.headers)
  const createHeader = useBoundStore((state) => state.createHeader)
  const deleteHeader = useBoundStore((state) => state.deleteHeader)
  const changeHeader = useBoundStore((state) => state.changeHeader)

  const {
    locale: { mainPage },
  } = useLocale()

  return (
    <Stack
      height={1}
      sx={{
        overflow: 'overlay',
        padding: 2,
        boxSizing: 'border-box',
        container: 'headers / inline-size',
      }}
    >
      <Stack gap={1}>
        {headers.map(({ id, checked, headerKey, headerVal }) => (
          <HeaderControl
            key={id}
            checked={checked}
            headerKey={headerKey}
            headerVal={headerVal}
            handleCheck={(checked) => changeHeader(id, { checked })}
            handleKeyChange={(headerKey) => changeHeader(id, { headerKey })}
            handleValChange={(headerVal) => changeHeader(id, { headerVal })}
            handleDelete={() => deleteHeader(id)}
          />
        ))}
      </Stack>
      <Box alignSelf="end" mt={2} pr={1}>
        <Button
          startIcon={<Add />}
          variant="outlined"
          onClick={() => createHeader(crypto.randomUUID())}
        >
          {mainPage.button.addHeader}
        </Button>
      </Box>
    </Stack>
  )
}
