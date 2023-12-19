import { type userData } from '@/types/types'
import { FormControl, FormHelperText, TextField } from '@mui/material'
import { type FieldErrors, type UseFormRegister } from 'react-hook-form'

export function EmailInput(props: {
  register: UseFormRegister<userData>
  errors: FieldErrors<userData>
}): React.ReactElement {
  const { register, errors } = props

  return (
    <FormControl margin="normal" fullWidth variant="outlined">
      <TextField
        sx={{
          marginBottom: '50px',
        }}
        fullWidth
        {...register('email')}
        type="email"
        label="Email"
        error={!!errors.email}
      />
      <FormHelperText
        sx={{
          minWidth: '522px',
          position: 'absolute',
          top: '55px',
        }}
        error
      >
        {errors.email?.message}
      </FormHelperText>
    </FormControl>
  )
}
