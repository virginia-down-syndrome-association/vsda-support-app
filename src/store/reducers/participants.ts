import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type SexType, type ResidencyStatus } from '../../typings/rest'

// types and variables
export type Participant = {
  id: number
  FirstName: number
  LastName: number
  Birthdate: any
  Sex: SexType
  CF_FamilyID: number
  ConstituentNumber: number
  coordinates: [number, number]
}

export type ProspectiveParticipant = {
  status: number
  residency: ResidencyStatus
  participant_consent: boolean
  participant_firstname: string
  participant_lastname: string
  participant_age: number
  participant_sex: SexType
  preferred_outreach: string
  CreationDate: any
}

type ParticipantState = {
  participants: Participant[]
  prospectiveParticipants: ProspectiveParticipant[]

}

const initialState: ParticipantState = {
  participants: [],
  prospectiveParticipants: []
}

const participantSlice = createSlice({
  name: 'participants',
  initialState,
  reducers: {
    setParticipants (state, action: PayloadAction<Participant[]>) {
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
    resetParticipantState (state) {
      state = initialState
    }
  }
})

const { actions, reducer } = participantSlice
export const { setParticipants, setProspectiveParticipants, resetParticipantState } = actions
export default reducer
