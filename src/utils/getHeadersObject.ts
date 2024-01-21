import type { Header } from '@/store/store'

export function getHeadersObject(headers: Header[]) {
  const cleanedHeaders = {} as Record<string, string>
  headers.forEach((header) => {
    if (header.checked) {
      cleanedHeaders[header.headerKey] = header.headerVal
    }
  })
  return cleanedHeaders
}
