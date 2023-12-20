import type { AuthPageModeSlice, SliceCreator } from '../store'

export const createAuthPageModeSlice: SliceCreator<AuthPageModeSlice> = (
  set,
) => ({
  pageMode: 'signUp',
  setPageMode: (mode) =>
    set((state) => {
      state.pageMode = mode
    }),
})
