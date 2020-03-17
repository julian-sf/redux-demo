// ANY FETCHING LIBRARY CODE

import { useReducer, Dispatch, useEffect } from 'react'

type Action = {
  type: 'FETCH' | 'FETCH_ERROR' | 'FETCH_SUCCESS'
  data?: any
  error?: any
}

type State = {
  data?: any
  loading: boolean
  error?: any
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH': {
      return {
        loading: true,
      }
    }
    case 'FETCH_ERROR': {
      return {
        loading: false,
        error: action.error,
      }
    }
    case 'FETCH_SUCCESS': {
      return {
        loading: false,
        data: action.data,
      }
    }
    default: {
      return state
    }
  }
}

const INITIAL_STATE = {
  loading: true,
  data: undefined,
  error: undefined,
}

export const useFetchReducer: () => [State, Dispatch<Action>] = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  return [state, dispatch]
}

export const useQuery = <T>(callback: () => Promise<T>, { onComplete }: { onComplete: (data: T) => void }) => {
  const [state, dispatch] = useFetchReducer()

  useEffect(() => {
    callback()
      .then((data: T) => {
        dispatch({ type: 'FETCH_SUCCESS', data })
        onComplete(data)
      })
      .catch(error => dispatch({ type: 'FETCH_ERROR', error }))
  }, [callback, dispatch, onComplete])

  return state
}
