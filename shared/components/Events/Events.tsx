import React from 'react';

import { EventType } from '../../../api/events/eventsQuery/eventsQuery.types';
import { Event } from './Event';

type EventsProps = {
  events: EventType[];
  loading: boolean;
};

export const Events = ({ events, loading }: EventsProps) => (
  <>
    <div>
      {events.map((event, i) => (
        <Event key={i} event={event} loading={loading} />
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
