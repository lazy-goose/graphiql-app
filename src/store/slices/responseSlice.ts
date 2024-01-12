import { StatusText } from '@/constants'
import { getHeadersObject } from '@/utils/getHeadersObject'
import type { ResponseSlice, SliceCreator } from '../store'

const prettifyResponse = (string: string) => {
  return JSON.stringify(string, null, 2)
}

const roughResponseByteSize = async (response: Response) => {
  const contentLength = Number(response.headers.get('Content-Length'))
  if (contentLength) {
    return contentLength
  }
  const stringByteCount = (s: string) => new TextEncoder().encode(s).length
  const bodySize = stringByteCount(await response.text())
  const headSize = stringByteCount(
    [...response.headers].map((header) => header.length).join(''),
  )
  return bodySize + headSize
}

export const createResponseSlice: SliceCreator<ResponseSlice> = (set, get) => ({
  stringifiedResponse: '',
  responseError: null,
  isResponseFetching: false,
  responseMetrics: {
    statusText: '',
    successful: false,
    status: 0,
    sizeKb: 0,
    timeMs: 0,
  },
  fetchQueryResponse: async () => {
    const {
      baseUrl,
      defaultUrl,
      stringifiedQuery,
      headers,
      stringifiedVariables,
    } = get()

    let response: Response
    let requestStartAt: number

    try {
      const url = baseUrl || defaultUrl
      const query = stringifiedQuery

      const variables = JSON.parse(stringifiedVariables)

      set((state) => {
        state.isResponseFetching = true
      })

      requestStartAt = Date.now()

      response = await fetch(url, {
        method: 'POST',
        headers: getHeadersObject(headers),
        body: JSON.stringify({
          query,
          variables,
        }),
      })

      const responseByteSize = await roughResponseByteSize(response.clone())
      const responseJson = await response.json()

      const statusText =
        response.statusText || StatusText.get(response.status) || ''

      set((state) => {
        state.stringifiedResponse = prettifyResponse(responseJson)
        state.responseMetrics = {
          statusText,
          successful: response.ok,
          status: response.status,
          sizeKb: responseByteSize / 1000,
          timeMs: Date.now() - requestStartAt,
        }
      })
    } catch (e) {
      set((state) => {
        state.responseError = e as Error
        state.responseMetrics = {
          statusText: '',
          successful: false,
          status: 0,
          sizeKb: 0,
          timeMs: 0,
        }
      })
    } finally {
      set((state) => {
        state.isResponseFetching = false
      })
    }
  },
})
