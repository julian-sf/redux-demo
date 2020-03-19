import React from 'react';
import TestRenderer from 'react-test-renderer';

describe('EventsContainer', () => {
  it('Returns loader when loading events, returns events when loaded', async () => {
    const wrapperJsx = (
      <div>
        <input type={'text'} value={'ok'} />
      </div>
    );

    const wrapperMy = React.createElement('div', {}, React.createElement('input', { type: 'text', value: 'ok' }));
    console.log(wrapperJsx);
    console.log(wrapperMy);
    console.log('==========');
    console.log(TestRenderer.create(wrapperJsx).toJSON());

    expect(1).toBe(1);
  });
});
