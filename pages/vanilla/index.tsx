import React, { useContext } from 'react';

import { useFetchEventChain } from '../../comparison/useFetchEvents';
import { VanillaEventsContainer } from '../../comparison/vanilla/VanillaEventsContainer';
import { VanillaEventsContext } from '../../comparison/vanilla/VanillaEventsContext';
import { Navigation } from '../../shared/Navigation';
import { useUpdateContextOnIndex } from '../../shared/useUpdateContextOnIndex';
import { selectUserLoading } from '../../store/auth/selectors';
import { useSelector } from '../../store/utils';

const VanillaContextIndex = () => {
  const userLoading = useSelector(selectUserLoading);
  const { update } = useContext(VanillaEventsContext);
  const { loading: fetchLoading, data } = useFetchEventChain({ skip: userLoading });

  useUpdateContextOnIndex({ loading: fetchLoading || userLoading, data, update });

  return (
    <>
      <Navigation title={'Event List'} subtitle={'Context Example'} />
      <VanillaEventsContainer />
    </>
  );
};

export default VanillaContextIndex;
