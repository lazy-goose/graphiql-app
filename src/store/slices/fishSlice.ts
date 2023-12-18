import { type FishSlice, type SliceCreator } from '../store'

export const createFishSlice: SliceCreator<FishSlice> = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
})
