import '@testing-library/jest-dom'
import { afterAll, afterEach, beforeAll, vi } from 'vitest'
import { server } from './mocks/server'
import * as mockZustand from './mocks/zustand'

window.Math.random = vi.fn().mockImplementation(() => 1)
vi.spyOn(console, 'error').mockImplementation(() => {})
vi.mock('zustand', () => mockZustand)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
