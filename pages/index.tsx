import React from 'react';

import { withRedux } from '../next-utils/withRedux';
import { AuthButton } from '../shared/components/AuthButton/AuthButton';
import { Events } from '../shared/components/Events/Events';

export default withRedux(() => (
  <>
    <h1>Event List</h1>
    <AuthButton />
    <Events />
  </>
));
