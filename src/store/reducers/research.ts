import { createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type Participant, type ProspectiveParticipant } from './participants'

type ResearchParticipant = Participant & {
  County: string
  CreationDate: any
  PostalCode: number
  Coordinates: [number, number]
}

type ResearchState = {
  booted: boolean
  currentParticipant: ResearchParticipant | null
  participants: ResearchParticipant[]
  prospectiveParticipants: ProspectiveParticipant[]
}

const initialState: ResearchState = {
  booted: false,
  currentParticipant: null,
  participants: [],
  prospectiveParticipants: []
}

const researchSlice = createSlice({
  name: 'research',
  initialState,
  reducers: {
    setBootedStatus (state, action: PayloadAction<boolean>) {
      const { payload } = action
      return {
        ...state,
        booted: payload
      }
    },
    setCurrentParticipant (state, action: PayloadAction<number>) {
      const { payload } = action
      const tempState = current(state)
      const currentParticipant = tempState.participants.find(p => p.id === payload) as ResearchParticipant

      return {
        ...state,
        currentParticipant
      }
    },
    setParticipants (state, action: PayloadAction<ResearchParticipant[]>) {
      const { payload } = action
      return {
        ...state,
        participants: payload
      }
    },
    setProspectiveParticipants (state, action: PayloadAction<ProspectiveParticipant[]>) {
      const { payload } = action
      return {
        ...state,
        prospectiveParticipants: payload
      }
    },
    resetResearchState (state) {
      state = initialState
    }
  }
})

const { actions, reducer } = researchSlice
export const { setParticipants, setProspectiveParticipants, resetResearchState, setCurrentParticipant } = actions
export default reducer
