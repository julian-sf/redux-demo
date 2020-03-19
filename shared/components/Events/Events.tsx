import React from 'react';

import { EventType } from '../../../api/events/eventsQuery/eventsQuery.types';
import { Event } from './Event';

type EventsProps = {
  events: EventType[];
};

export const Events = ({ events }: EventsProps) => (
  <>
    <div>
      {events.map((event, i) => (
        <Event key={i} event={event} />
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
