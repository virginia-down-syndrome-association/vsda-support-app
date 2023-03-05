// redux
import { combineReducers, createStore } from '@reduxjs/toolkit'
import * as reducers from './reducers'

const appReducer = combineReducers(reducers)
export type RootState = ReturnType<typeof appReducer>

/* eslint-disable no-underscore-dangle */
const store = createStore(
  appReducer, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__?.()
)
/* eslint-enable */

export default store
