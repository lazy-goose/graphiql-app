import { useLocale } from '@/hooks/useLocale'

export default function useDocumentationLocale() {
  const {
    locale: {
      mainPage: { documentation },
    },
  } = useLocale()
  return documentation
}
