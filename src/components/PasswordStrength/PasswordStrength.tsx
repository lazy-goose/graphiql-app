import { usePasswordErrors } from '@/hooks/usePasswordErrors'
import { type userSignInData, type userSignUpData } from '@/types/types'
import { getPasswordErrorsData } from '@/utils/getPasswordErrorsData'
import { Box, FormHelperText, Typography } from '@mui/material'
import { type UseFormGetValues } from 'react-hook-form'
import styles from './PasswordStrength.module.css'

export function PasswordStrength(props: {
  watch: UseFormGetValues<userSignUpData | userSignInData>
}) {
  const { watch } = props

  const passwordErrors = usePasswordErrors(watch('password'))

  return (
    <>
      {passwordErrors && (
        <Box
          sx={{
            width: { xs: 99 / 100, md: 552 },
            position: 'absolute',
            top: '60px',
            display: 'flex',
            paddingLeft: { sm: 0, md: '15px' },
          }}
        >
          <div
            className={getPasswordErrorsData(passwordErrors, styles).className}
          >
            <span className={styles.inner_indicator} />
            <span className={styles.inner_indicator} />
            <span className={styles.inner_indicator} />
            <span className={styles.inner_indicator} />
            <span className={styles.inner_indicator} />
          </div>
          <Typography variant="body2">
            {getPasswordErrorsData(passwordErrors, styles).text}
          </Typography>
        </Box>
      )}
      {passwordErrors && passwordErrors.length > 0 && (
        <FormHelperText
          sx={{
            width: { xs: 97 / 100, md: 540 },
            position: 'absolute',
            top: '80px',
            marginLeft: { xs: '0px', sm: '0px', md: '15px' },
          }}
          error
        >
          {`Strong password must contain ${passwordErrors?.join(', ')}`}
        </FormHelperText>
      )}
    </>
  )
}
