import { render } from '@testing-library/react'
import React from 'react'

import { Events } from './Events'

describe('EventsContainer', () => {
  it('tests', () => {
    const { debug, container } = render(<Events events={[]} clearEvents={() => {}} />)

    debug()
    expect(1).toBe(1)
  })
})
