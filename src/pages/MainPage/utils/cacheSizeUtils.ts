import createStorageObject, { safeParse } from '@/utils/createStorageObject'
import { z } from 'zod'

export function cacheSizeUtils(key: string, fallback: number[]) {
  const { getCacheItem, setCacheItem } = createStorageObject('mainLayout')
  const setter = (sizes: number[]) => setCacheItem(key, JSON.stringify(sizes))
  const stringified = getCacheItem(key)
  const cached = safeParse(stringified, z.array(z.number()), fallback)
  return [setter, cached] as const
}
