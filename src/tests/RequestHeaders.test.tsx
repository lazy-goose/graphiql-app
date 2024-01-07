import { RequestHeaders } from '@/components/RequestHeaders'
import HeaderControl from '@/components/RequestHeaders/HeaderControl'
import { describe, expect, test } from 'vitest'
import renderInContext from './renderInContext'

describe('Correct RequestHeaders snapshot', () => {
  test('Correct [RequestHeaders] snapshot', () => {
    const { baseElement } = renderInContext(<RequestHeaders />)
    expect(baseElement).toMatchSnapshot()
  })
  test('Correct HeaderControl snapshot', () => {
    const props = {
      handleCheck: () => {},
      handleDelete: () => {},
      handleKeyChange: () => {},
      handleValChange: () => {},
      headerKey: '',
      headerVal: '',
    }
    expect(<HeaderControl checked={false} {...props} />).toMatchSnapshot()
    expect(<HeaderControl checked={true} {...props} />).toMatchSnapshot()
  })
})
