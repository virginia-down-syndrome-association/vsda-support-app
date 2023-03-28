import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type SexType } from '../../typings/rest'

type AgePayload = {
  minAge: number
  maxAge: number
}

type FilterState = {
  minAge: number
  maxAge: number
  county: string
  sex: SexType
}

const initialState: FilterState = {
  minAge: 0,
  maxAge: 100,
  county: 'all',
  sex: 'all'
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setAge (state, action: PayloadAction<AgePayload>) {
      return {
        ...state,
        ...action.payload
      }
    },
    setCounty (state, action: PayloadAction<string>) {
      state.county = action.payload
    },
    setSex (state, action: PayloadAction<string>) {
      state.sex = action.payload as SexType
    },
    resetFilterState (state) {
      state = initialState
    }
  }
})

const { actions, reducer } = filterSlice
export const { setAge, setCounty, setSex, resetFilterState } = actions
export default reducer
