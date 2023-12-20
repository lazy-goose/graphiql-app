import { type userSignInData, type userSignUpData } from '@/types/types'
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
  register: UseFormRegister<userSignUpData | userSignInData>
  errors: FieldErrors<userSignUpData>
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
    <FormControl fullWidth variant="outlined">
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
          width: { xs: 99 / 100, md: 552 },
          position: 'absolute',
          top: '55px',
          marginLeft: { xs: '0px', sm: '0px', md: '15px' },
        }}
        error
      >
        {errors.confirmPassword?.message}
      </FormHelperText>
    </FormControl>
  )
}
