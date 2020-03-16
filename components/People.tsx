import React from 'react'

import { People as PeopleType } from '../api'
import { Person } from './Person'

export const People = ({ people }: { people: PeopleType }) => {
  return (
    <div style={{ display: 'flex', flexFlow: 'row wrap', margin: '20px 40px' }}>
      {Object.keys(people).map(id => {
        const person = people[id]

        return <Person key={person.id} person={person} />
      })}
    </div>
  )
}
