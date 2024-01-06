import { LocaleContext } from '@/contexts/localeContext'
import { useContext } from 'react'

export const useLocale = () => {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error(
      'To use the useLocale context, the React tree must be wrapped in <LocaleProvider>',
    )
  }
  return context
}
