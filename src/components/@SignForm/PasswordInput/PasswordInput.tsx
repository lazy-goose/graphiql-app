import { useLocale } from '@/hooks/useLocale'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  IconButton,
  InputAdornment,
  TextField,
  type TextFieldProps,
} from '@mui/material'
import React, { useState } from 'react'

const PasswordInput = React.forwardRef<HTMLInputElement, TextFieldProps>(
  function PasswordInput(props, ref) {
    const { InputProps, inputProps, disabled, ...passTextFieldProps } = props
    const [showPassword, setShowPassword] = useState(false)
    const {
      locale: { signInUpPage },
    } = useLocale()
    const toggleShowPassword = () => setShowPassword(!showPassword)
    return (
      <TextField
        variant="outlined"
        type={showPassword ? 'text' : 'password'}
        label={signInUpPage.inputLabel.password}
        disabled={disabled}
        inputProps={{
          form: { autocomplete: 'off' },
          ...inputProps,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="button"
                aria-label="toggle password visibility"
                onPointerDown={toggleShowPassword}
                disableTouchRipple
                sx={(theme) => ({
                  color: theme.palette.grey[500],
                })}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
          ...InputProps,
        }}
        ref={ref}
        {...passTextFieldProps}
      />
    )
  },
)

export default PasswordInput
