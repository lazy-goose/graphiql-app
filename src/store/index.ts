import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createAuthPageModeSlice } from './slices/authPageModeSlice'
import { createAuthSlice } from './slices/authSlice'
import { type Store } from './store.d'

const isDevMode = import.meta.env.DEV

export const useBoundStore = create<Store>()(
  devtools(
    immer((...args) => ({
      ...createAuthPageModeSlice(...args),
      ...createAuthSlice(...args),
    })),
    { enabled: isDevMode },
  ),
)
