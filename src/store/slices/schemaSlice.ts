import { getApiIntrospectionSchema } from '@/API'
import { type GraphQLSchema } from 'graphql'
import { type Draft } from 'immer'
import type { SchemaSlice, SliceCreator } from '../store'

export const createSchemaSlice: SliceCreator<SchemaSlice> = (set, get) => ({
  schema: null,
  schemaError: null,
  isSchemaFetching: false,
  fetchSchema: async (baseUrl = get().baseUrl) => {
    set((state) => {
      state.isSchemaFetching = true
      state.baseUrl = baseUrl
    })
    try {
      const schema = await getApiIntrospectionSchema(baseUrl)
      set((state) => {
        state.schemaError = null
        state.schema = schema as unknown as Draft<GraphQLSchema>
      })
    } catch (e) {
      set((state) => {
        state.schemaError = e as Error
      })
    } finally {
      set((state) => {
        state.isSchemaFetching = false
      })
    }
  },
})
