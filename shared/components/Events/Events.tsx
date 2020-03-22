import React from 'react';

import { useEvents } from '../../../store/events';
import { Event } from './Event';

export const Events = ({ specificEventIds }: { specificEventIds?: string[] }) => {
  const { initialized, events } = useEvents();

  if (!initialized) return null;

  const eventIds = specificEventIds || Object.keys(events);

  return (
    <>
      <div>
        {eventIds.map(id => {
          const event = events[id];

          return event && <Event key={event.id} event={event} />;
        })}
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
