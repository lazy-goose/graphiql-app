import { getApiIntrospectionSchema } from '@/API'
import { type GraphQLSchema } from 'graphql'
import { type Draft } from 'immer'
import type { SchemaSlice, SliceCreator } from '../store'

export const createSchemaSlice: SliceCreator<SchemaSlice> = (set, get) => ({
  schema: null,
  fetchSchema: async (baseUrl = get().baseUrl) => {
    const schema = await getApiIntrospectionSchema(baseUrl)
    return set((state) => {
      state.schema = schema as unknown as Draft<GraphQLSchema>
    })
  },
})
