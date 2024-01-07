import type { Header } from '@/store/store'

export function getHeadersObject(headers: Header[]) {
  const cleanedHeaders = {} as Record<string, string>
  cleanedHeaders['Content-type'] = 'application/json'
  headers.forEach((header) => {
    if (header.checked) {
      cleanedHeaders[header.headerKey] = header.headerVal
    }
  })
  return cleanedHeaders
}
