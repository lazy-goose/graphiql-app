import { z } from 'zod'

export function safeParse<V, F = unknown>(
  value: unknown,
  schema: z.Schema<V>,
  fallback: F,
): V | F {
  try {
    if (typeof value !== 'string') {
      throw new Error()
    }
    const result = JSON.parse(value)
    if (!schema.safeParse(result).success) {
      throw new Error()
    }
    return result
  } catch {
    return fallback
  }
}

export default function createStorageObject(storageName: string) {
  const getCacheSlice = (): Record<string, string> => {
    const sliceStringified = localStorage.getItem(storageName)
    return safeParse(sliceStringified, z.object({}), {})
  }
  const setCacheItem = (key: string, text: string) => {
    const cache = getCacheSlice()
    localStorage.setItem(storageName, JSON.stringify({ ...cache, [key]: text }))
  }
  const getCacheItem = (key: string): string | null => {
    const cache = getCacheSlice()
    return cache[key] || null
  }
  return {
    getCacheSlice,
    setCacheItem,
    getCacheItem,
  }
}
