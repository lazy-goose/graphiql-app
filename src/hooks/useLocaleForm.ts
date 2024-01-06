import { useLocale } from '@/hooks/useLocale'
import { useEffect, useRef } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useForm, type UseFormProps } from 'react-hook-form'

export function useLocaleForm<T extends FieldValues>(
  useFormParams: UseFormProps<T>,
) {
  const { locale } = useLocale()

  const useFormReturn = useForm<T>(useFormParams)

  const prevCodeRef = useRef(locale.meta.code)
  useEffect(() => {
    const prevCode = prevCodeRef.current
    const currCode = locale.meta.code
    const submitCount = useFormReturn.formState.submitCount
    if (submitCount && prevCode !== currCode) {
      useFormReturn.trigger()
    }
    prevCodeRef.current = currCode
  })

  return useFormReturn
}
