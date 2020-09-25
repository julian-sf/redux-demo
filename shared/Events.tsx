import React from 'react';

import { NormalizedEvents } from '../api/events';
import { Event } from './Event';
import { useRenderCount } from './useRenderCount';

export type EventsProps = {
  specificEventIds?: string[];
  events?: NormalizedEvents;
  loadingEvents?: boolean;
};

export const Events = ({ specificEventIds, events, loadingEvents = false }: EventsProps) => {
  const renderCount = useRenderCount();

  return (
    <>
      <h3>Events Renders: {renderCount}</h3>
      <div>
        {!events || Object.keys(events).length === 0 ? (
          <div>Loading events...</div>
        ) : (
          (specificEventIds || Object.keys(events ?? [])).map(id => {
            const event = events[id];

            return <Event userLoading={false} eventsLoading={loadingEvents} key={events[id].id} event={event} />;
          })
        )}
      </div>
      <style jsx>{`
        div {
          display: flex;
          flex-flow: row wrap;

          margin: 20px 40px;
          width: 75vw;
          max-width: 700px;
        }
      `}</style>
    </>
  );
};

Events.whyDidYouRender = true;
