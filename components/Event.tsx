import Link from 'next/link';
import React, { useState } from 'react';

import { EventData } from '../server/data/events';
import { useEvents } from '../store/events';
import { useRenderCount } from '../utils/useRenderCount';
import { Loader } from './Loader';
import { Modal } from './Modal';

export const Event = ({ event }: { event: EventData }) => {
  const [open, setOpen] = useState(false);
  const renderCount = useRenderCount();
  const { loading } = useEvents();

  return (
    <>
      <div className={'container'}>
        <Loader loading={loading}>
          <div className={'card'}>
            <Link href={'/[event]'} as={`/${event.id}`}>
              <a>Name: {event.name}</a>
            </Link>
            <button onClick={() => setOpen(true)}>View Details</button>
          </div>
        </Loader>
        {renderCount && <pre>Event render count: {renderCount}</pre>}
      </div>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <pre className={'code'}>{JSON.stringify(event ?? {}, null, 2)}</pre>
        </Modal>
      )}

      <style jsx>{`
        .container {
          position: relative;
          flex: 1 1 700px;
          height: 100px;
          box-shadow: 3px 3px 7px -3px rgba(0, 0, 0, 0.7);
          border-radius: 10px;
          border: 2px black;
          margin-bottom: 20px;
        }

        .card {
          padding: 20px;

          display: flex;
          flex-flow: row nowrap;
        }

        .card a {
          flex: 1;
        }

        .card button {
          flex: 0 1 100px;
        }

        .card + pre {
          padding-left: 20px;
        }

        .code {
          max-width: 80vw;
          overflow: scroll;
          background-color: lightgrey;
          padding: 10px;
        }
      `}</style>
    </>
  );
};
