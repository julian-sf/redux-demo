import Link from 'next/link'
import React, { useState } from 'react'

import { AuthButton } from '../components/AuthButton'
import { Modal } from '../components/Modal'

const Other = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <h1>Event Detail</h1>
      <AuthButton />
      <Link href={'/'}>
        <button>Back to index</button>
      </Link>
      <br />
      <button onClick={() => setOpen(true)}>Open Modal</button>

      {open && <Modal onClose={() => setOpen(false)} />}
    </>
  )
}

export default Other
