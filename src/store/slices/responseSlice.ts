import type { ResponseSlice, SliceCreator } from '../store'

export const createResponseSlice: SliceCreator<ResponseSlice> = (set) => ({
  response: 'No response',
  changeResponse: (newResponse) =>
    set((state) => {
      state.response = newResponse
    }),
})
