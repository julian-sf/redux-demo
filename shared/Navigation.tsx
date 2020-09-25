import Link from 'next/link';
import React, { useCallback, useContext } from 'react';
import { useContextSelector } from 'use-context-selector';

import { EventsContext } from '../comparison/context/EventsContext';
import { VanillaEventsContext } from '../comparison/vanilla/VanillaEventsContext';
import { useRouter } from '../next-utils/router';
import { useFetchEvents } from '../store/events/dispatchers';
import { AuthButton } from './AuthButton';

export const Navigation = (props: { title: string; subtitle?: string }) => {
  const { route } = useRouter();
  const update = useContextSelector(EventsContext, value => value?.update);
  const { update: updateVanilla } = useContext(VanillaEventsContext);
  const fetchEvents = useFetchEvents();

  const clearVanilla = useCallback(() => {
    if (!route?.includes('vanilla')) updateVanilla({});
  }, [route, updateVanilla]);

  const clearContext = useCallback(() => {
    if (!route?.includes('context')) update({});
  }, [route, update]);

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
