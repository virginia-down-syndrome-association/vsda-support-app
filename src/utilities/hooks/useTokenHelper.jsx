import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { UserSession } from '@esri/arcgis-rest-auth'
import Credential from '@arcgis/core/identity/Credential'

function useTokenHelper (props) {
  const { token, server: portal, expires, userId } = useSelector((state) => state.auth.credential)

  const [authentication, setAuthentication] = useState(null)

  useEffect(() => {
    if (token && portal) {
      const credential = new Credential({
        server: portal,
        token,
        expires,
        userId
      })

      const auth = UserSession.fromCredential(credential)
      setAuthentication(auth)
    }
  }, [token])

  return { token, authentication }
}

export default useTokenHelper
