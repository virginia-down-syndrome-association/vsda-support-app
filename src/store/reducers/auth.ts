// types and variables
export type LocalCredential = {
  token?: string
  userId?: string
}
type AuthState = {
  credential: LocalCredential
}
const authStateInit: AuthState = {
  credential: {},
}

type AuthActionType = 'AUTH_STATE_SET_CREDENTIAL'
type AuthAction = {
  type: AuthActionType
  payload?: any
}

// reducer
const authReducer = (state = authStateInit, action: AuthAction) => {
  let newState: AuthState = state
  switch (action.type) {
    case 'AUTH_STATE_SET_CREDENTIAL':
      const credential = action.payload as LocalCredential
      newState = {
        ...state,
        credential,
      }
      return newState

    default:
      return newState
  }
}

export default authReducer

// actions
export const setLocalCredential = (
  credential: LocalCredential
): AuthAction => ({
  type: 'AUTH_STATE_SET_CREDENTIAL',
  payload: credential,
})
