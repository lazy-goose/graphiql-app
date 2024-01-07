import { TeammateCard } from '@/components/TeammateCard'
import { expect, test } from 'vitest'
import renderInContext from './renderInContext'

test('Correct TeammateCard snapshot', () => {
  const { baseElement } = renderInContext(
    <TeammateCard
      id="teammate1"
      cvHref=""
      href=""
      imgAlt=""
      imgSrc=""
      tgHref=""
    />,
  )
  expect(baseElement).toMatchSnapshot()
})
