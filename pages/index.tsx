import React from 'react';

import { AuthButton } from '../shared/components/AuthButton/AuthButton';
import { Events } from '../shared/components/Events/Events';

const IndexPage = () => (
  <>
    <h1>Event List</h1>
    <AuthButton />
    <Events />
  </>
);

export default IndexPage;
