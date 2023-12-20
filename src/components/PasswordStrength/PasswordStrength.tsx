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
            minWidth: '552px',
            position: 'absolute',
            top: '60px',
            display: 'flex',
            paddingLeft: '15px',
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
          sx={{ minWidth: '542px', position: 'absolute', top: '80px' }}
          error
        >
          {`Strong password must contain ${passwordErrors?.join(', ')}`}
        </FormHelperText>
      )}
    </>
  )
}
