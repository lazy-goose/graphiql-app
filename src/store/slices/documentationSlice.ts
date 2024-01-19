import type { Draft } from 'immer'
import type { DocumentationSlice, SliceCreator } from '../store'

export const createDocumentationSlice: SliceCreator<DocumentationSlice> = (
  set,
) => ({
  docNavStack: [{ name: 'Root' }],
  resetDocNavStack: () =>
    set((state) => {
      state.docNavStack = [{ name: 'Root' }]
    }),
  pushDocNavStack: (item) =>
    set((state) => {
      state.docNavStack.push(item as unknown as Draft<typeof item>)
    }),
  popDocNavStack: () =>
    set((state) => {
      if (state.docNavStack.length > 1) {
        state.docNavStack.pop()
      } else {
        throw new Error('state.docNavStack should contain at least on item')
      }
    }),
})
