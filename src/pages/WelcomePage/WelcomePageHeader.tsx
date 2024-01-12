import { Header } from '@/components/Header'
import { OutlineButton } from '@/components/OutlineButton'
import { RouterPath } from '@/constants'
import { useLocale } from '@/hooks/useLocale'
import { useBoundStore } from '@/store'
import { Link } from 'react-router-dom'

export default function WelcomePageHeader() {
  const {
    locale: { header },
  } = useLocale()
  const isAuthenticated = useBoundStore((state) => state.isAuthenticated())

  const ExplorerButton = (
    <OutlineButton component={Link} to={RouterPath.Main} color="secondary">
      {header.button.explorer}
    </OutlineButton>
  )

  return <Header leftSlot={isAuthenticated ? ExplorerButton : undefined} />
}
