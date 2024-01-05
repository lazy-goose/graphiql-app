import { type User } from 'firebase/auth'
import { type StateCreator } from 'zustand'

type Header = {
  id: React.Key
  checked: boolean
  headerKey: string
  headerVal: string
}

export type RequestSettingsSlice = {
  headers: Header[]
  deleteHeader: (id: React.Key) => void
  createHeader: (newId: React.Key) => void
  changeHeader: (id: React.Key, toChange: Optional<Omit<Header, 'id'>>) => void
}
export type MainLayoutSlice = {
  isAsideOpen: boolean
  toggleAside: (force?: boolean) => void
}
export type AuthSlice = {
  user: User | null
  setUser: (user: User | null) => void
}

export type Store = AuthSlice & MainLayoutSlice & RequestSettingsSlice

export type Mutators = [['zustand/devtools', never], ['zustand/immer', never]]
export type SliceCreator<T, R = Store> = StateCreator<R, Mutators, [], T>
