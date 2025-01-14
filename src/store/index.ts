import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createAuthSlice } from './slices/authSlice'
import { createDocumentationSlice } from './slices/documentationSlice'
import { createMainLayoutSlice } from './slices/mainLayoutSlice'
import { createRequestSettingsSlice } from './slices/requestSettings'
import { createResponseSlice } from './slices/responseSlice'
import { createSchemaSlice } from './slices/schemaSlice'
import { type Store } from './store.d'

import { persist } from 'zustand/middleware'

export * from './store.d'

const enableDevtools = import.meta.env.MODE !== 'test' && import.meta.env.DEV

const StorageSave = ({
  baseUrl,
  headers,
  isAsideOpen,
  isSettingsWindowOpen,
  settingsWindowPrevSizes,
  settingsWindowTabGroup,
}: Store): Partial<Store> => ({
  baseUrl,
  headers,
  isAsideOpen,
  isSettingsWindowOpen,
  settingsWindowPrevSizes,
  settingsWindowTabGroup,
})

export const storeName = (userName?: string | null | undefined) => {
  return `mainStorage.${userName || 'anonymous'}`
}

export const useBoundStore = create<Store>()(
  devtools(
    persist(
      immer((...args) => ({
        ...createAuthSlice(...args),
        ...createDocumentationSlice(...args),
        ...createMainLayoutSlice(...args),
        ...createRequestSettingsSlice(...args),
        ...createSchemaSlice(...args),
        ...createResponseSlice(...args),
      })),
      {
        name: storeName(),
        partialize: StorageSave,
        skipHydration: true,
      },
    ),
    { enabled: enableDevtools },
  ),
)
