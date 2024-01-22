import type { MainLayoutSlice, SliceCreator } from '../store'

export const createMainLayoutSlice: SliceCreator<MainLayoutSlice> = (
  set,
  get,
) => ({
  isAsideOpen: false,
  toggleAsideOpen: (bool = !get().isAsideOpen) =>
    set((state) => {
      state.isAsideOpen = bool
    }),
  isSettingsWindowOpen: true,
  toggleSettingsWindowOpen: (bool = !get().isSettingsWindowOpen) =>
    set((state) => {
      state.isSettingsWindowOpen = bool
    }),
  settingsWindowTabGroup: 'Variables',
  setSettingsWindowTabGroup: (tabName) =>
    set((state) => {
      state.settingsWindowTabGroup = tabName
    }),
})
