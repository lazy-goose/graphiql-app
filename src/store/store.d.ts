import { type User } from 'firebase/auth'
import { type GraphQLSchema } from 'graphql'
import { type StateCreator } from 'zustand'

type Header = {
  id: React.Key
  checked: boolean
  headerKey: string
  headerVal: string
}

export type SchemaSlice = {
  schema: GraphQLSchema | null
  schemaError: Error | null
  isSchemaFetching: boolean
  fetchSchema: (baseUrl?: string) => Promise<void>
}
export type ResponseSlice = {
  stringifiedResponse: string
  responseError: Error | null
  isResponseFetching: boolean
  fetchQueryResponse: () => Promise<void>
}
export type RequestSettingsSlice = {
  headers: Header[]
  deleteHeader: (id: React.Key) => void
  createHeader: (newId: React.Key) => void
  changeHeader: (id: React.Key, toChange: Optional<Omit<Header, 'id'>>) => void
  stringifiedVariables: string
  setStringifiedVariables: (stringifiedVariables) => void
  defaultUrl: string
  baseUrl: string
  setBaseUrl: (baseUrl: string) => void
  stringifiedQuery: string
  setStringifiedQuery: (query: string) => void
}
export type MainLayoutSlice = {
  isAsideOpen: boolean
  toggleAside: (force?: boolean) => void
}
export type AuthSlice = {
  user: User | null
  isUserLoading: boolean
  setUser: (user: User | null) => void
}

export type Store = AuthSlice &
  MainLayoutSlice &
  RequestSettingsSlice &
  SchemaSlice &
  ResponseSlice

export type Mutators = [['zustand/devtools', never], ['zustand/immer', never]]
export type SliceCreator<T, R = Store> = StateCreator<R, Mutators, [], T>
