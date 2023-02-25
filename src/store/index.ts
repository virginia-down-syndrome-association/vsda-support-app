// redux
import { combineReducers, createStore } from '@reduxjs/toolkit'
import * as reducers from './reducers'

const appReducer = combineReducers(reducers)
export type RootState = ReturnType<typeof appReducer>

export default createStore(appReducer)
