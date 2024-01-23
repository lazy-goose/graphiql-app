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
  settingsWindowPrevSizes: [],
  toggleSettingsWindowOpen: (
    bool = !get().isSettingsWindowOpen,
    prevSizes = null,
  ) =>
    set((state) => {
      state.isSettingsWindowOpen = bool
      state.settingsWindowPrevSizes = prevSizes
    }),
  settingsWindowTabGroup: 'Variables',
  setSettingsWindowTabGroup: (tabName) =>
    set((state) => {
      state.settingsWindowTabGroup = tabName
    }),
})
