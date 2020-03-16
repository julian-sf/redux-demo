import React from 'react'

import { Person as PersonType } from '../api'
import { usePeople } from '../store/people'

const Row = (props: { label: string; value: string }) => {
  const { label, value } = props

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '0 0 90px' }}>{label}:</div>
      <div>{value}</div>
    </div>
  )
}

export const Person = ({ person }: { person: PersonType }) => {
  const people = usePeople()

  return (
    <div style={{ flex: '0 0 400px', paddingBottom: 20 }}>
      <div style={{ height: 100, boxShadow: '0 8px 6px -6px black', border: '2px lightgrey' }}>
        <Row label={'Name'} value={person.name} />
        {person.friends && (
          <Row label={'Friends'} value={person.friends.map(friend => people[friend].name).join(', ')} />
        )}
        {person.bestFriend && <Row label={'Best Friend'} value={people[person.bestFriend].name} />}
        {person.hobbies && <Row label={'Hobbies'} value={person.hobbies.join(', ')} />}
      </div>
    </div>
  )
}
