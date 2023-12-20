import { type User } from 'firebase/auth'
import { type StateCreator } from 'zustand'

export type BearSlice = {
  bears: number
  addBear: () => void
  eatFish: () => void
}
export type FishSlice = {
  fishes: number
  addFish: () => void
}
export type AuthPageModeSlice = {
  pageMode: string
  setPageMode: (mode: string) => void
}
export type AuthSlice = {
  user: User | null
  setUser: (user: User | null) => void
}
export type Store = BearSlice & FishSlice & AuthPageModeSlice & AuthSlice
export type Mutators = [['zustand/devtools', never], ['zustand/immer', never]]
export type SliceCreator<T, R = Store> = StateCreator<R, Mutators, [], T>
