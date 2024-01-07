import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createAuthSlice } from './slices/authSlice'
import { createMainLayoutSlice } from './slices/mainLayoutSlice'
import { createRequestSettingsSlice } from './slices/requestSettings'
import { createResponseSlice } from './slices/responseSlice'
import { createSchemaSlice } from './slices/schemaSlice'
import { type Store } from './store.d'

const isDevMode = import.meta.env.DEV

export const useBoundStore = create<Store>()(
  devtools(
    immer((...args) => ({
      ...createAuthSlice(...args),
      ...createMainLayoutSlice(...args),
      ...createRequestSettingsSlice(...args),
      ...createSchemaSlice(...args),
      ...createResponseSlice(...args),
    })),
    { enabled: isDevMode },
  ),
)
