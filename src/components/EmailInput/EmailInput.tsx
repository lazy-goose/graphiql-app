import { type UserSignInData, type UserSignUpData } from '@/types'
import { FormControl, FormHelperText, TextField } from '@mui/material'
import { type FieldErrors, type UseFormRegister } from 'react-hook-form'

export function EmailInput(props: {
  register: UseFormRegister<UserSignUpData | UserSignInData>
  errors: FieldErrors<UserSignUpData | UserSignInData>
}) {
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
          width: { xs: 99 / 100, md: 540 },
          position: 'absolute',
          top: 55,
          marginLeft: { xs: '0px', sm: '0px', md: '15px' },
        }}
        error
      >
        {errors.email?.message}
      </FormHelperText>
    </FormControl>
  )
}
