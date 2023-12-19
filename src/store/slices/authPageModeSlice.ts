import type { AuthPageSlice, SliceCreator } from '../store'

export const createAuthPageModeSlice: SliceCreator<AuthPageSlice> = (set) => ({
  pageMode: 'signUp',
  setPageMode: (mode) =>
    set((state) => {
      state.pageMode = mode
    }),
})
