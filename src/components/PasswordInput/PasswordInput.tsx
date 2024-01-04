import { usePasswordErrors } from '@/hooks/usePasswordErrors'
import { type UserSignInData, type UserSignUpData } from '@/types'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import { useState } from 'react'
import type { UseFormGetValues, UseFormRegister } from 'react-hook-form'
import { PasswordStrength } from '../PasswordStrength'

export function PasswordInput(props: {
  register: UseFormRegister<UserSignUpData | UserSignInData>
  setIsIndicator: React.Dispatch<React.SetStateAction<boolean>>
  watch: UseFormGetValues<UserSignUpData | UserSignInData>
  isIndicator: boolean
}) {
  const { register, setIsIndicator, watch, isIndicator } = props
  const [showPassword, setShowPassword] = useState(false)
  const passwordErrors = usePasswordErrors(watch('password'))
  const passwordFields = { ...register('password') }

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    passwordFields.onChange(e)
    setIsIndicator(true)
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  return (
    <FormControl margin="normal" fullWidth variant="outlined">
      <InputLabel
        error={!!(isIndicator && passwordErrors && passwordErrors.length > 0)}
        htmlFor="password"
      >
        Password
      </InputLabel>
      <OutlinedInput
        sx={{ marginBottom: { xs: '85px', sm: '75px', md: '65px' } }}
        id="password"
        {...passwordFields}
        onChange={handlePasswordInput}
        type={showPassword ? 'text' : 'password'}
        error={!!(isIndicator && passwordErrors && passwordErrors.length > 0)}
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
        label="Password"
      />
      {isIndicator && <PasswordStrength watch={watch} />}
    </FormControl>
  )
}
