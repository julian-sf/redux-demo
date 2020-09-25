import React, { useContext } from 'react';

import { VanillaEventsContainer } from '../../comparison/vanilla/VanillaEventsContainer';
import { VanillaEventsContext } from '../../comparison/vanilla/VanillaEventsContext';
import { Navigation } from '../../shared/Navigation';
import { useUpdateContextOnIndex } from '../../shared/useUpdateContextOnIndex';
import { selectUserLoading } from '../../store/auth/selectors';
import { useSelector } from '../../store/utils';

const VanillaContextIndex = () => {
  const userLoading = useSelector(selectUserLoading);
  const { update } = useContext(VanillaEventsContext);

  useUpdateContextOnIndex({ loading: userLoading, update });

  return (
    <>
      <Navigation title={'Event List'} subtitle={'Vanilla Context Example'} />
      <VanillaEventsContainer />
    </>
  );
};

export default VanillaContextIndex;
