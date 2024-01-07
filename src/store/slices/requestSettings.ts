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
  stringifiedVariables: '{}',
  setStringifiedVariables: (stringifiedVariables) =>
    set((state) => {
      state.stringifiedVariables = stringifiedVariables
    }),
  defaultUrl: 'https://countries.trevorblades.com/graphql',
  baseUrl: 'https://countries.trevorblades.com/graphql',
  setBaseUrl: (baseUrl) =>
    set((state) => {
      state.baseUrl = baseUrl
    }),
  stringifiedQuery: `query countries($filter: CountryFilterInput) {
  countries(filter: $filter) {
  __typename
  code
  name
  native
  phone
  capital
  currency
  emoji
  emojiU
}
}`,
  setStringifiedQuery: (query) =>
    set((state) => {
      state.stringifiedQuery = query
    }),
})
