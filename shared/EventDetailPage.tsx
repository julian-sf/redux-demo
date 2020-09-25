import Link from 'next/link';
import React from 'react';

import { NormalizedEvent, NormalizedEvents } from '../api/events';
import { useRouter } from '../next-utils/router';
import { Events } from './Events';
import { Navigation } from './Navigation';
import { useRenderCount } from './useRenderCount';

export const EventDetailPage = ({ events, eventData }: { events?: NormalizedEvents; eventData?: NormalizedEvent }) => {
  const renderCount = useRenderCount();
  const { pathname } = useRouter();

  return (
    <>
      <Navigation
        title={`Event Details ${eventData?.name ? `: ${eventData.name}` : 'Loading'}`}
        subtitle={'Redux Example'}
      />
      <h3>Event Page Renders: {renderCount}</h3>
      <Link href={pathname.replace('/[event]', '')}>
        <button>Back to index</button>
      </Link>
      <h2>Related Events</h2>
      <Events events={events} specificEventIds={eventData?.relatedEvents} />
    </>
  );
};
