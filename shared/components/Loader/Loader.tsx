import React, { ReactNode } from 'react';
import { BarLoader } from 'react-spinners';

const layerStyle = `
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
`;

export const Loader = ({ loading = true, children }: { loading?: boolean; children?: ReactNode }) => (
  <>
    {children}
    {loading && (
      <div className={'container'}>
        <div className={'backdrop'} />
        <BarLoader />
      </div>
    )}
    <style jsx>{`
      .container {
        ${layerStyle};

        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
      }

      .backdrop {
        ${layerStyle};

        background-color: white;
        border-radius: 10px;
        opacity: 80%;

        pointer-events: unset;
      }
    `}</style>
  </>
);
