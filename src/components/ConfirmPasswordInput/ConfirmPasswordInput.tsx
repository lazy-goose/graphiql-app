import { type userData } from '@/types/types'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import { useState } from 'react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'

export function ConfirmPasswordInput(props: {
  register: UseFormRegister<userData>
  errors: FieldErrors<userData>
}) {
  const { register, errors } = props
  const [showPassword, setShowPassword] = useState(false)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  return (
    <FormControl margin="normal" fullWidth variant="outlined">
      <InputLabel error={!!errors.confirmPassword} htmlFor="confirm-password">
        Confirm Password
      </InputLabel>
      <OutlinedInput
        sx={{ marginBottom: '30px' }}
        id="confirm-password"
        {...register('confirmPassword')}
        type={showPassword ? 'text' : 'password'}
        error={!!errors.confirmPassword}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Confirm Password"
      />
      <FormHelperText
        sx={{
          minWidth: 1 / 3,
          position: 'absolute',
          top: '55px',
        }}
        error
      >
        {errors.confirmPassword?.message}
      </FormHelperText>
    </FormControl>
  )
}
