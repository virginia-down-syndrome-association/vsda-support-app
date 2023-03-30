// redux
import { combineReducers, createStore } from '@reduxjs/toolkit'
import * as reducers from './reducers'

const appReducer = combineReducers(reducers)
export type RootState = ReturnType<typeof appReducer>

const actionSanitizer = (action: any) => {
  return action.type === 'MAP_STATE_SET_MAPVIEW' && (Boolean(action.payload)) ? { ...action, payload: 'Map view sanitized for Devtools' } : action
}

/* eslint-disable no-underscore-dangle */
const store = createStore(
  appReducer, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
    actionSanitizer,
    stateSanitizer: (state) => state.map.view ? { ...state, map: { view: '<<LONG_BLOB>>' } } : state
  })
)
/* eslint-enable */

export default store
