import React, { useCallback } from 'react'

export const Modal = ({ onClose }: { onClose(): void }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const close = useCallback(() => onClose(), [])

  return (
    <>
      <div className={'overlay'} onClick={close} />
      <div className={'modal'}>
        <a type={'button'} className={'cross'} onClick={close} />
        Content
      </div>

      <style jsx>{`
        .overlay {
          z-index: 1000;

          // position
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;

          // display
          opacity: 20%;
          background-color: black;

          // events
          pointer-events: unset;
        }

        .modal {
          z-index: 1010;

          // position
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          max-width: 100%;

          // display
          opacity: 1;
          background-color: white;
          box-shadow: 3px 3px 7px -3px rgba(0, 0, 0, 0.7);
          border-radius: 10px;
          padding: 42px 60px 42px 42px;

          //events
          pointer-events: all;
        }

        .modal .cross {
          position: relative;
          top: -20px;
          left: -20px;
          transition: transform 0.8s ease-in-out;
          opacity: 0.5;
        }

        .modal .cross:hover {
          opacity: 1;
        }
        .modal .cross::after {
          content: '✕';
        }
      `}</style>
    </>
  )
}
