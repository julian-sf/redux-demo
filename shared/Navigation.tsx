import Link from 'next/link';
import React, { useCallback } from 'react';
import { useContextSelector } from 'use-context-selector';

import { EventsContext } from '../comparison/context/EventsContext';
import { useRouter } from '../next-utils/router';
import { useFetchEvents } from '../store/events/dispatchers';
import { AuthButton } from './AuthButton';

export const Navigation = (props: { title: string; subtitle?: string }) => {
  const { route } = useRouter();
  const update = useContextSelector(EventsContext, value => value?.update);
  const fetchEvents = useFetchEvents();

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
      <Link href={'/context'}>
        <button type={'button'} onClick={clearContext}>
          Context Events
        </button>
      </Link>
      <Link href={'/'}>
        <button type={'button'} onClick={clearRedux}>
          Redux Events
        </button>
      </Link>
      <AuthButton />
    </>
  );
};
