import { getHeadersObject } from '@/utils/getHeadersObject'
import {
  buildClientSchema,
  getIntrospectionQuery,
  type GraphQLSchema,
} from 'graphql'
import { type Draft } from 'immer'
import type { SchemaSlice, SliceCreator } from '../store'

export const createSchemaSlice: SliceCreator<SchemaSlice> = (set, get) => ({
  schema: null,
  schemaError: null,
  isSchemaFetching: false,
  fetchSchema: async (forceBaseUrl) => {
    const { headers, getBaseUrl, resetDocNavStack } = get()
    const baseUrl = forceBaseUrl || getBaseUrl()

    try {
      set((state) => {
        state.isSchemaFetching = true
        state.baseUrl = baseUrl
      })

      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          ...getHeadersObject(headers),
        }),
        body: JSON.stringify({ query: getIntrospectionQuery() }),
      })

      const responseJson = await response.json()

      const firstError = responseJson?.errors?.at(0)
      if (firstError) {
        throw new Error(firstError?.message)
      }

      const schema = buildClientSchema(responseJson.data)

      set((state) => {
        state.schemaError = null
        state.schema = schema as unknown as Draft<GraphQLSchema>
      })
      resetDocNavStack()
    } catch (e) {
      set((state) => {
        state.schemaError = e as Error
        state.schema = null
      })
    } finally {
      set((state) => {
        state.isSchemaFetching = false
      })
    }
  },
})
