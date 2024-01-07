import LanguageMenu from '@/components/Header/LanguageMenu'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import renderInContext from './renderInContext'

describe('LanguageMenu', async () => {
  test('Correct [Language menu] snapshot', () => {
    const { baseElement } = renderInContext(<LanguageMenu />)
    expect(baseElement).toMatchSnapshot()
  })
  test('Show/Close menu on click', async () => {
    renderInContext(<LanguageMenu />)
    const btn = await screen.findByRole('button')
    await userEvent.click(btn)
    expect(screen.getByRole('menu')).toBeInTheDocument()
    await userEvent.click(document.body)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument
  })
})
