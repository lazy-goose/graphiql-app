import type { RequestSettingsSlice, SliceCreator } from '../store'

export const createRequestSettingsSlice: SliceCreator<RequestSettingsSlice> = (
  set,
) => ({
  headers: [
    { id: 'Initial header', checked: false, headerKey: '', headerVal: '' },
  ],
  deleteHeader: (id) =>
    set((state) => {
      const targetIndex = state.headers.findIndex((h) => h.id === id)
      state.headers.splice(targetIndex, 1)
    }),
  createHeader: (newId) =>
    set((state) => {
      state.headers.push({
        id: newId,
        checked: false,
        headerKey: '',
        headerVal: '',
      })
    }),
  changeHeader: (id, toChange) =>
    set((state) => {
      const targetHeader = state.headers.find((h) => h.id === id)
      if (!targetHeader) return
      if (Object.hasOwn(toChange, 'checked'))
        targetHeader.checked = toChange.checked
      if (Object.hasOwn(toChange, 'headerKey'))
        targetHeader.headerKey = toChange.headerKey
      if (Object.hasOwn(toChange, 'headerVal'))
        targetHeader.headerVal = toChange.headerVal
    }),
})
