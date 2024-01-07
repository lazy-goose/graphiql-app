import { MainPage } from '@/pages/MainPage'
import MainControls from '@/pages/MainPage/MainControls'
import MainLayout from '@/pages/MainPage/MainLayout'
import SchemaControls from '@/pages/MainPage/SchemaControls'
import { describe, expect, test, vi } from 'vitest'
import renderInContext from './renderInContext'

window.matchMedia = vi.fn().mockReturnValue(false)

vi.mock('@mui/material', async () => {
  const actual =
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    await vi.importActual<typeof import('@mui/material')>('@mui/material')
  return {
    ...actual,
    useMediaQuery: () => false,
  }
})

describe('Correct MainPage snapshot', () => {
  test('Correct MainControls snapshot', () => {
    const { baseElement } = renderInContext(<MainControls />)
    expect(baseElement).toMatchSnapshot()
  })
  test('Correct SchemaControls snapshot', () => {
    const { baseElement } = renderInContext(<SchemaControls />)
    expect(baseElement).toMatchSnapshot()
  })
  test('Correct MainLayout snapshot', () => {
    const { baseElement } = renderInContext(
      <MainLayout
        documentation={null}
        headers={null}
        request={null}
        response={null}
        variables={null}
      />,
    )
    expect(baseElement).toMatchSnapshot()
  })
  test('Correct [MainPage] snapshot', () => {
    const { baseElement } = renderInContext(<MainPage />)
    expect(baseElement).toMatchSnapshot()
  })
})
