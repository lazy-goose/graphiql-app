import { getHeadersObject } from '@/utils/getHeadersObject'
import type { ResponseSlice, SliceCreator } from '../store'

const prettifyResponse = (string: string) => {
  return JSON.stringify(string, null, 2)
}

export const createResponseSlice: SliceCreator<ResponseSlice> = (set, get) => ({
  stringifiedResponse: '',
  responseError: null,
  isResponseFetching: false,
  fetchQueryResponse: async () => {
    const {
      baseUrl,
      defaultUrl,
      stringifiedQuery,
      headers,
      stringifiedVariables,
    } = get()

    let response: Response

    try {
      const url = baseUrl || defaultUrl
      const query = stringifiedQuery

      const variables = JSON.parse(stringifiedVariables)

      set((state) => {
        state.isResponseFetching = true
      })

      response = await fetch(url, {
        method: 'POST',
        headers: getHeadersObject(headers),
        body: JSON.stringify({
          query,
          variables,
        }),
      })

      const result = await response.json()

      set((state) => {
        state.stringifiedResponse = prettifyResponse(result)
      })
    } catch (e) {
      set((state) => {
        state.responseError = e as Error
      })
    } finally {
      set((state) => {
        state.isResponseFetching = false
      })
    }
  },
})
