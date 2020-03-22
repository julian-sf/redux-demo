import React from 'react';

import { withRedux } from '../next-utils/withRedux';
import { AuthButton } from '../shared/components/AuthButton/AuthButton';
import { Events } from '../shared/components/Events/Events';
import { useRenderCount } from '../utils/useRenderCount';

export default withRedux(() => {
  const renderCount = useRenderCount();

  return (
    <>
      <h1>Event List</h1>
      {renderCount && <pre>Index render count: {renderCount}</pre>}
      <AuthButton />
      <Events />
    </>
  );
});
