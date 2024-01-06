import { PredefinedHeaders } from '@/constants/constants'
import { useLocale } from '@/hooks/useLocale'
import { Delete } from '@mui/icons-material'
import {
  Autocomplete,
  Box,
  Checkbox,
  IconButton,
  TextField,
} from '@mui/material'

export default function HeaderControl(props: {
  checked: boolean
  headerKey: string
  headerVal: string
  handleCheck: (checked: boolean) => void
  handleKeyChange: (key: string) => void
  handleValChange: (value: string) => void
  handleDelete: () => void
}) {
  const {
    checked,
    headerKey,
    headerVal,
    handleCheck,
    handleKeyChange,
    handleValChange,
    handleDelete,
  } = props

  const { locale } = useLocale()

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 1,
        gridTemplateAreas: `"check key value delete"`,
        gridTemplateColumns: 'max-content 1fr 1fr max-content',
        justifyItems: 'center',
        '@container (max-width: 400px)': {
          gridTemplateAreas: `
            "key   key   check"
            "value value delete"
          `,
          gridTemplateColumns: '1fr max-content',
        },
      }}
    >
      <Box sx={{ gridArea: 'check' }}>
        <Checkbox
          value={checked}
          sx={{
            '&.Mui-disabled': {
              cursor: 'not-allowed',
              pointerEvents: 'painted',
            },
          }}
          disabled={!headerKey.length}
          onChange={(_, checked) => handleCheck(checked)}
        />
      </Box>
      <Autocomplete
        sx={{ gridArea: 'key' }}
        size="small"
        freeSolo
        fullWidth
        options={PredefinedHeaders}
        renderInput={(params) => (
          <TextField {...params} label={locale.mainPage.inputLabel.headerKey} />
        )}
        value={headerKey}
        onChange={(_, value) => handleKeyChange(value || '')}
      />
      <TextField
        sx={{ gridArea: 'value' }}
        size="small"
        fullWidth
        label={locale.mainPage.inputLabel.headerValue}
        value={headerVal}
        onChange={(event) => handleValChange(event.currentTarget.value)}
      />
      <Box sx={{ gridArea: 'delete' }}>
        <IconButton color="error" onClick={() => handleDelete()}>
          <Delete />
        </IconButton>
      </Box>
    </Box>
  )
}
