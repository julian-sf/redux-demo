import React from 'react'

import { usePeople } from '../store/people'
import { Person } from './Person'

export const People = () => {
  const people = usePeople()

  return (
    <div style={{ display: 'flex', flexFlow: 'row wrap', margin: '20px 40px' }}>
      {Object.keys(people).map(id => {
        const person = people[id]

        return <Person key={person.id} person={person} />
      })}
    </div>
  )
}
