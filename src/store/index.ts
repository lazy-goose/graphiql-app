import { create } from 'zustand'
import { createBearSlice } from './slices/bearSlice'
import { createFishSlice } from './slices/fishSlice'
import { type Store } from './store.d'

export const useBoundStore = create<Store>()((...args) => ({
  ...createBearSlice(...args),
  ...createFishSlice(...args),
}))
