import type { AuthSlice, SliceCreator } from '../store'

export const createAuthSlice: SliceCreator<AuthSlice> = (set) => ({
  user: null,
  isUserLoading: true,
  setUser: (user) =>
    set((state) => {
      state.user = user
      state.isUserLoading = false
    }),
})
