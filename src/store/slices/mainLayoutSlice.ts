import type { MainLayoutSlice, SliceCreator } from '../store'

export const createMainLayoutSlice: SliceCreator<MainLayoutSlice> = (set) => ({
  isAsideOpen: false,
  toggleAside: (force?: boolean) =>
    set((state) => {
      state.isAsideOpen =
        typeof force === 'undefined' ? !state.isAsideOpen : force
    }),
})
