/* eslint-disable @typescript-eslint/consistent-type-imports */
import '@testing-library/jest-dom'
import { afterAll, afterEach, beforeAll, vi } from 'vitest'
import { server } from './mocks/server'
import * as mockZustand from './mocks/zustand'

window.matchMedia = vi.fn().mockReturnValue(false)
window.Math.random = vi.fn().mockImplementation(() => 1)

vi.spyOn(console, 'error').mockImplementation(() => {})
vi.mock('zustand', () => mockZustand)
vi.mock('@mui/material', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@mui/material')>()
  return {
    ...mod,
    useMediaQuery: vi.fn().mockReturnValue(false),
  }
})

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
