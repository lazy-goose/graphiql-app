import { type Region } from '@/constants'
import type MainLocale from '@/constants/locales/en'

export type Locale = typeof MainLocale

export type LocaleWithMeta = Locale & {
  meta: {
    code: Region
    name: string
  }
}
