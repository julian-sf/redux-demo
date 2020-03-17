import React from 'react'

import { EventData } from '../server/data/events'

const Row = (props: { label: string; value: string }) => {
  const { label, value } = props

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '0 0 90px' }}>{label}:</div>
      <div>{value}</div>
    </div>
  )
}

export const Event = ({ event }: { event: EventData }) => {
  return (
    <div style={{ flex: '0 0 400px', paddingBottom: 20 }}>
      <div style={{ height: 100, boxShadow: '0 8px 6px -6px black', border: '2px lightgrey' }}>
        <Row label={'Name'} value={event.name} />
      </div>
    </div>
  )
}
