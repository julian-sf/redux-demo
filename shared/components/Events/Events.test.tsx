import { render } from '@testing-library/react';
import React from 'react';

import { events } from '../../../server/data/events';
import { Events } from './Events';

describe('Events', () => {
  it('displays all events', () => {
    const { getAllByTestId, getByText } = render(<Events events={events} />);

    expect(getByText(/Cirque du Soleil VIP Packages/)).toBeTruthy();
    expect(getByText(/Kevin James/)).toBeTruthy();
    expect(getAllByTestId('event').length).toBe(7);
  });
});
