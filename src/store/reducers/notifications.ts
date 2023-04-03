import { toast } from 'react-toastify'

export type Status = {
  status: StatusTypes
  msg: string
}

export type StatusTypes = 'success' | 'failure'

type notificationState = {
  status: StatusTypes
  loading: boolean
}

const notificationStateInit: notificationState = {
  status: 'success',
  loading: false
}

type StatusNotificationActionType = 'NOTIFICATION_STATE_STATUS_NOTIFICATION'
type StatusNotificationAction = {
  type: StatusNotificationActionType
  payload?: any
}

type SetLoaderActionType = 'SET_LOADING_STATUS'
type SetLoaderAction = {
  type: SetLoaderActionType
  payload?: boolean
}

const notificationReducer = (
  state = notificationStateInit,
  action: StatusNotificationAction | SetLoaderAction
) => {
  let newState: notificationState = state
  switch (action.type) {
    case 'NOTIFICATION_STATE_STATUS_NOTIFICATION':
      const { status, msg } = action.payload as Status
      if (status === 'success') {
        toast(msg, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          type: 'success',
          theme: 'light'
        })
      }
      else if (status === 'failure') {
        toast(msg, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          type: 'error',
          theme: 'light'
        })
      }
      return newState
      break

  case 'SET_LOADING_STATUS':
    const loaderStatus = action.payload as boolean
      newState = {
      ...state,
      loading: loaderStatus
    }
    return newState
    break

  default:
    return newState
  }
}

export default notificationReducer

// actions
export const setNotificationStatus = (
  status: StatusTypes
): StatusNotificationAction => ({
  type: 'NOTIFICATION_STATE_STATUS_NOTIFICATION',
  payload: status
})

// actions
export const setLoadingStatus = (
  status: boolean
): SetLoaderAction => ({
  type: 'SET_LOADING_STATUS',
  payload: status
})
