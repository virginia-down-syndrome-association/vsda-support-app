import { toast } from 'react-toastify'

export type Status = {
  status: StatusTypes
  msg: string
}

export type StatusTypes = 'success' | 'failure'

type notificationState = {
  status: StatusTypes
}

const notificationStateInit: notificationState = {
  status: 'success',
}

type StatusNotificationActionType = 'NOTIFICATION_STATE_STATUS_NOTIFICATION'
type StatusNotificationAction = {
  type: StatusNotificationActionType
  payload?: any
}

const notificationReducer = (
  state = notificationStateInit,
  action: StatusNotificationAction
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
          theme: 'light',
        })
      } else if (status === 'failure') {
        toast(msg, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          type: 'error',
          theme: 'light',
        })
      }

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
  payload: status,
})
