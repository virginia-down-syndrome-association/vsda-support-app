// redux
import { LocalCredential } from '@/store/reducers/auth'

// arcgis
import Credential from '@arcgis/core/identity/Credential'
import IdentityManager from '@arcgis/core/identity/IdentityManager'
import OAuthInfo from '@arcgis/core/identity/OAuthInfo'
import Portal from '@arcgis/core/portal/Portal'

/**
 * Register application ID and Portal URL
 * with the IdentityManager
 * @param appId
 * @param portalUrl
 * @returns Promise<void>
 */

export const initializeAppWithIdentityManager = async (
  appId: string,
  portalUrl: string
): Promise<__esri.OAuthInfo> => {
  const popup = false
  const flowType = 'auto' //"authorization-code"; //if using popup authorization-code must be set
  const oauthInfo = new OAuthInfo({ appId, flowType, popup, portalUrl })
  IdentityManager.registerOAuthInfos([oauthInfo])
  return oauthInfo
}

/**
 * Check current logged in status for current portal
 * @returns Promise<void>
 */
export const checkCurrentStatus = async (oauthInfo: __esri.OAuthInfo) => {
  try {
    const credential = await IdentityManager.checkSignInStatus(
      `${oauthInfo.portalUrl}/sharing`
    )

    const user = await fetchUser()

    return { credential, user }
  } catch (error:any) {
    throw new Error(error)
  }
}

/**
 * Attempt to sign in,
 * first check current status
 * if not signed in, then go through
 * steps to get credentials
 * @returns Promise<`esri/identity/Credential`>
 */
export const signIn = async (oauthInfo: __esri.OAuthInfo) => {
  try {
    const { credential, user } = await checkCurrentStatus(oauthInfo)
    return { credential, user }
  } catch (error) {
    // @ts-ignore // the typing of the `fetchCredentials()` return statement has to be updated
    const { credential, user } = await fetchCredentials(oauthInfo)
    return { credential, user }
  }
}

/**
 * Sign the user out, but if we checked credentials
 * manually, make sure they are registered with
 * IdentityManager, so it can destroy them properly
 * @returns Promise<void>
 */
export const signOut = async () => {
  IdentityManager.destroyCredentials()
  window.location.reload()
}

/**
 * Get the credentials for the provided portal
 * @returns Promise<`esri/identity/Credential`>
 */
export const fetchCredentials = async (oauthInfo: __esri.OAuthInfo) => {
  try {
    const credential = await IdentityManager.getCredential(
      `${oauthInfo.portalUrl}/sharing`,
      {
        error: undefined,
        oAuthPopupConfirmation: false,
        token: undefined,
      }
    )

    const user = await fetchUser()

    return { credential, user }
  } catch (error) {
    console.log(error)
  }
}

/**
 * `initAuthenticationOrReturnLocalCredential` will initiate redirect to authentication view if `IdentityManager`
 * has no authenticated user.  Otherwise, it fetches and returns existing credentials attributes known
 * to the `IdentityManager`.
 * @returns LocalCredential | false
 */

export const initAuthenticationOrReturnLocalCredential = async (
  portalUrl: string
): Promise<LocalCredential | false> => {
  try {
    const fetchedCredential: Credential = await IdentityManager.getCredential(
      `${portalUrl}/sharing`
    )
    const localCredential: LocalCredential = {
      token: fetchedCredential.token,
      userId: fetchedCredential.userId,
    }
    return localCredential
  } catch (e) {
    console.error('Authentication failed.', e)
    return false
  }
}

export const fetchUser = async () => {
  try {
    const portal = new Portal()
    await portal.load()
    return portal.user
  } catch (error) {
    console.log(error)
  }
}
