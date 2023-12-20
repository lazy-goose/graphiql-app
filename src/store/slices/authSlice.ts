import type { AuthSlice, SliceCreator } from '../store'

export const createAuthSlice: SliceCreator<AuthSlice> = (set) => ({
  user: null,
  setUser: (user) =>
    set((state) => {
      state.user = user
    }),
})
