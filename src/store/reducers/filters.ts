import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type SexType } from '../../typings/rest'

type AgePayload = {
  minAge: number
  maxAge: number
}

type FilterState = {
  cg: string
  race: string
  minAge: number
  maxAge: number
  county: string
  sex: SexType
  currentFeatures: any[]
  selectedFeatures: any[]
  matrixLookup: any[]
}

const initialState: FilterState = {
  cg: 'all',
  race: 'all',
  minAge: 0,
  maxAge: 100,
  county: 'all',
  sex: 'all',
  currentFeatures: [],
  selectedFeatures: [],
  matrixLookup: []
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
    setRace (state, action: PayloadAction<string>) {
      state.race = action.payload
    },
    setCG (state, action: PayloadAction<string>) {
      state.cg = action.payload
    },
    setSex (state, action: PayloadAction<string>) {
      state.sex = action.payload as SexType
    },
    resetFilterState (state) {
      state = initialState
    },
    resetFilters (state, action: PayloadAction<string>) {
      const updatedState = {
        ...state,
        minAge: 0,
        maxAge: 100,
        county: 'all',
        sex: 'all'
      }
      state = updatedState
    },
    setCurrentFeatures (state, action: PayloadAction<any[]>) {
      state.currentFeatures = action.payload
    },
    clearCurrentFeatures (state) {
      state.currentFeatures = []
    },
    setSelectedFeatures (state, action: PayloadAction<any[]>) {
      state.selectedFeatures = action.payload
    },
    clearSelectedFeatures (state) {
      state.selectedFeatures = []
    },
    setMatrixLookup (state, action: PayloadAction<any[]>) {
      state.matrixLookup = action.payload
    },
    clearMatrixLookup (state) {
      state.matrixLookup = []
    }
  }
})

const { actions, reducer } = filterSlice
export const {
  setAge,
  setCounty,
  setSex,
  resetFilterState,
  resetFilters,
  setCurrentFeatures,
  setRace,
  setCG,
  clearCurrentFeatures,
  setSelectedFeatures,
  clearSelectedFeatures,
  setMatrixLookup,
  clearMatrixLookup
} = actions

export default reducer
