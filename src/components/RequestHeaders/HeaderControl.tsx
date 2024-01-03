import { PredefinedHeaders } from '@/constants/constants'
import { Delete } from '@mui/icons-material'
import {
  Autocomplete,
  Box,
  Checkbox,
  IconButton,
  TextField,
  type SxProps,
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

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 1,
        gridTemplateAreas: `
          "check key value delete"
        `,
        gridTemplateColumns: 'max-content 1fr 1fr max-content',
        ...Object.fromEntries(
          ['check', 'delete', 'key', 'value'].map((key) => [
            `.${key}`,
            { gridArea: key } satisfies SxProps,
          ]),
        ),
        '@container (max-width: 400px)': {
          gridTemplateAreas: `
            "key   key   check"
            "value value delete"
          `,
          gridTemplateColumns: '1fr max-content',
        },
      }}
    >
      <Box className="check">
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
        className="key"
        size="small"
        freeSolo
        fullWidth
        options={PredefinedHeaders}
        renderInput={(params) => <TextField {...params} label="Header key" />}
        value={headerKey}
        onChange={(_, value) => handleKeyChange(value || '')}
      />
      <TextField
        className="value"
        size="small"
        fullWidth
        label="Value"
        value={headerVal}
        onChange={(event) => handleValChange(event.currentTarget.value)}
      />
      <Box className="delete">
        <IconButton color="error" onClick={() => handleDelete()}>
          <Delete />
        </IconButton>
      </Box>
    </Box>
  )
}
