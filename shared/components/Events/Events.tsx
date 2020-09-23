import React from 'react';

import { selectEvents } from '../../../store/events/selectors';
import { useSelector } from '../../../store/utils';
import { Event } from './Event';

export const Events = ({ specificEventIds }: { specificEventIds?: string[] }) => {
  const events = useSelector(selectEvents);

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
