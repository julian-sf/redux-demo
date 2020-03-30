import React from 'react';

import { useEvents } from '../../../store/events';
import { Event } from './Event';

export const Events = ({ specificEventIds }: { specificEventIds?: string[] }) => {
  const { events } = useEvents();

  return (
    <>
      <div>
        {(specificEventIds || Object.keys(events)).map(id => (
          <Event key={events[id].id} event={events[id]} />
        ))}
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
