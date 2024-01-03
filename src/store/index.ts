import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createAuthPageModeSlice } from './slices/authPageModeSlice'
import { createAuthSlice } from './slices/authSlice'
import { createMainLayoutSlice } from './slices/mainLayoutSlice'
import { createRequestSettingsSlice } from './slices/requestSettings'
import { type Store } from './store.d'

const isDevMode = import.meta.env.DEV

export const useBoundStore = create<Store>()(
  devtools(
    immer((...args) => ({
      ...createAuthPageModeSlice(...args),
      ...createAuthSlice(...args),
      ...createMainLayoutSlice(...args),
      ...createRequestSettingsSlice(...args),
    })),
    { enabled: isDevMode },
  ),
)
