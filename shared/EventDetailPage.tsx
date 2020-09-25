import Link from 'next/link';
import React from 'react';

import { NormalizedEvent } from '../api/events';
import { Events } from './Events';
import { Navigation } from './Navigation';
import { useRenderCount } from './useRenderCount';

export const EventDetailPage = ({ eventData }: { eventData?: NormalizedEvent }) => {
  const renderCount = useRenderCount();

  return (
    <>
      <Navigation
        title={`Event Details ${eventData?.name ? `: ${eventData.name}` : 'Loading'}`}
        subtitle={'Redux Example'}
      />
      <h3>Event Page Renders: {renderCount}</h3>
      <Link href={'/'}>
        <button>Back to index</button>
      </Link>
      <h2>Related Events</h2>
      <Events specificEventIds={eventData?.relatedEvents} />
    </>
  );
};
