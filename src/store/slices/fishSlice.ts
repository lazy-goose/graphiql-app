import { type FishSlice, type SliceCreator } from '../store'

export const createFishSlice: SliceCreator<FishSlice> = (set) => ({
  fishes: 0,
  addFish: () =>
    set((state) => {
      state.fishes += 1
    }),
})
