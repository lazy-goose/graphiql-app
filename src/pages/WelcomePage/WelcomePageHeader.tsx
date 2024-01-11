import { Header } from '@/components/Header'
import { RouterPath } from '@/constants'
import { useLocale } from '@/hooks/useLocale'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function WelcomePageHeader() {
  const {
    locale: { header: l },
  } = useLocale()
  return (
    <Header
      leftSlot={
        <Button
          component={Link}
          to={RouterPath.Main}
          variant="outlined"
          color="secondary"
          sx={(theme) => ({
            '&:hover': {
              color: theme.palette.background.paper,
              backgroundColor: theme.palette.secondary.main,
            },
          })}
        >
          {l.button.explorer}
        </Button>
      }
    />
  )
}
