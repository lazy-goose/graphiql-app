import { Locales, Region } from '@/constants/constants'
import { type LocaleWithMeta } from '@/types/locale'
import { createContext, useState } from 'react'

export type LocaleContextType = {
  locale: LocaleWithMeta
  setLocale: (region: Region | ((regions: typeof Region) => Region)) => void
}

export const LocaleContext = createContext<LocaleContextType | null>(null)

export function LocaleProvider(props: React.PropsWithChildren) {
  const { children } = props
  const [currentRegion, setCurrentRegion] = useState<Region>(Region.EN)

  const locale = Locales[currentRegion]
  const setLocale = (region: Region | ((regions: typeof Region) => Region)) => {
    if (typeof region === 'function') {
      setCurrentRegion(region(Region))
    } else {
      setCurrentRegion(region)
    }
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}
