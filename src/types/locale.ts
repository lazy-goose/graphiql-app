import { type Region } from '@/constants'

export type Locale = Record<string, never>
export type LocaleWithMeta = Locale & {
  meta: {
    code: Region
    name: string
  }
}
