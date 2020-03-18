import { spawn } from 'redux-saga/effects'

import { authSagas } from './auth'
import { eventSagas } from './events'

export function* sagas() {
  yield spawn(authSagas)
  yield spawn(eventSagas)
}
