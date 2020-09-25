import React from 'react';

import { EventsRedux } from '../../comparison/redux/EventsRedux';
import { Navigation } from '../../shared/Navigation';
import { useUpdateReduxOnIndex } from '../../shared/useUpdateReduxOnIndex';

const ReduxIndex = () => {
  useUpdateReduxOnIndex();

  return (
    <>
      <Navigation title={'Event List'} subtitle={'Redux Example'} />
      <EventsRedux />
    </>
  );
};

export default ReduxIndex;
