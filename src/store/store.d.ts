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
export type AuthPageSlice = {
  pageMode: string
  setPageMode: (mode: string) => void
}
export type Store = BearSlice & FishSlice & AuthPageSlice
export type Mutators = [['zustand/devtools', never], ['zustand/immer', never]]
export type SliceCreator<T, R = Store> = StateCreator<R, Mutators, [], T>
