import createStorageObject from '@/utils/createStorageObject'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Translate from 'translate'

type AutoTranslateOptions = {
  from?: string
  to: string
  text: string | null | undefined
  autoRun?: boolean
}

type AutoTranslateReturn = {
  translated: string
  isFetching: boolean
  error: Error | null
  trigger: () => void
}

const getHashCode = (string: string) => {
  let hash = 0
  if (string.length === 0) {
    return hash
  }
  for (let i = 0, ch; i < string.length; i++) {
    ch = string.charCodeAt(i)
    hash = (hash << 5) - hash + ch
    hash |= 0
  }
  return hash
}

const { getCacheItem, setCacheItem } = createStorageObject('autoTranslate')

export function useAutoTranslate(
  options: AutoTranslateOptions,
): AutoTranslateReturn {
  const { from = 'en', to, text, autoRun = false } = options

  const [translated, setTranslated] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const storageKey = useMemo(() => String(getHashCode(text + to)), [text, to])

  const translate = useCallback(async () => {
    if (!text || from === to) {
      return
    }
    try {
      setIsFetching(true)
      const result = await Translate(text, { from, to })
      setError(null)
      setTranslated(result)
      setCacheItem(storageKey, result)
      return result
    } catch (e) {
      setError(e as Error)
      setTranslated('')
    } finally {
      setIsFetching(false)
    }
  }, [from, to, text, storageKey])

  useEffect(() => {
    if (autoRun) {
      translate()
    }
  }, [autoRun, translate])

  return {
    translated: translated || getCacheItem(storageKey) || '',
    isFetching,
    error,
    trigger: translate,
  }
}
