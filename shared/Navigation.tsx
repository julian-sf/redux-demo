import Link from 'next/link';
import React, { useCallback, useContext } from 'react';
import { useContextSelector } from 'use-context-selector';

import { MemoizedEventsContext } from '../comparison/context/MemoizedEventsContext';
import { VanillaEventsContext } from '../comparison/vanilla/VanillaEventsContext';
import { useRouter } from '../next-utils/router';
import { useFetchEvents } from '../store/events/dispatchers';
import { AuthButton } from './AuthButton';

export const Navigation = (props: { title: string; subtitle?: string }) => {
  const { route } = useRouter();
  const setShouldUpdate = useContextSelector(MemoizedEventsContext, value => value?.setShouldUpdate);
  const { setShouldUpdate: setVanillaShouldUpdate } = useContext(VanillaEventsContext);
  const fetchEvents = useFetchEvents();

  const clearVanilla = useCallback(() => {
    if (!route?.includes('vanilla')) setVanillaShouldUpdate(true);
  }, [route, setVanillaShouldUpdate]);

  const clearContext = useCallback(() => {
    if (!route?.includes('context')) setShouldUpdate(true);
  }, [route, setShouldUpdate]);

  const clearRedux = useCallback(() => {
    if (route?.includes('context')) {
      fetchEvents();
    }
  }, [fetchEvents, route]);

  return (
    <>
      <h1>{props.title}</h1>
      {props.subtitle ? <h2>{props.subtitle}</h2> : null}
      <Link href={'/vanilla'}>
        <button type={'button'} onClick={clearVanilla}>
          Vanilla Context Events
        </button>
      </Link>
      <Link href={'/context'}>
        <button type={'button'} onClick={clearContext}>
          Memoized Context Events
        </button>
      </Link>
      <Link href={'/redux'}>
        <button type={'button'} onClick={clearRedux}>
          Redux Events
        </button>
      </Link>
      <AuthButton />
    </>
  );
};
