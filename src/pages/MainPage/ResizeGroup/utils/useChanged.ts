import { useEffect, useRef } from 'react'

export function useChanged<T = never, V = never>(params: {
  value: V
  transform?: (v: V) => T extends never ? V : T
}) {
  const { value, transform = (v) => v } = params
  const prevValueRef = useRef(value)
  useEffect(() => {
    prevValueRef.current = value
  })
  return (() => {
    const prev = prevValueRef.current
    const curr = value
    return transform(prev) !== transform(curr)
  })()
}
