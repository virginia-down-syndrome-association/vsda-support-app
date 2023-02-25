// react
import React, { FC, useEffect } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/index'
import { LocalCredential, setLocalCredential } from '@/store/reducers/auth'

// services
import {
  initializeAppWithIdentityManager,
  initAuthenticationOrReturnLocalCredential,
} from '@/utilities/oauth'

const AuthGate: FC<React.PropsWithChildren> = ({ children }) => {
  // global state
  const localCredential = useSelector(
    (state: RootState) => state.auth.credential
  )
  const token = useSelector((state: RootState) => state.auth.credential.token)
  const dispatch = useDispatch()

  // auth constants
  const appId = import.meta.env.VITE_APP_ID
  const portalUrl = import.meta.env.VITE_PORTAL_URL

  // manage authentication check
  useEffect(() => {
    if (!token) {
      const triggerAuthWorkflow = async () => {
        await initializeAppWithIdentityManager(appId, portalUrl)
        const localCredential: LocalCredential | false =
          await initAuthenticationOrReturnLocalCredential(portalUrl)
        if (localCredential) dispatch(setLocalCredential(localCredential))
      }
      triggerAuthWorkflow()
    }
  }, [dispatch, localCredential])

  return <>{token && children}</>
}

export default AuthGate
