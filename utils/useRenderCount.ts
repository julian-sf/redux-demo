import { useRef } from 'react'

export const useRenderCount = () => {
  const renderCount = useRef(0)

  if ((process.env.DEBUG ?? '').toLowerCase() !== 'true') {
    return null
  }

  renderCount.current += 1

  return renderCount.current
}
