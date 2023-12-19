import { type BearSlice, type SliceCreator } from '../store.d'

export const createBearSlice: SliceCreator<BearSlice> = (set) => ({
  bears: 0,
  addBear: () =>
    set((state) => {
      state.bears += 1
    }),
  eatFish: () =>
    set((state) => {
      state.fishes -= 1
    }),
})
