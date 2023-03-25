import { createContext, useReducer, useEffect, useMemo } from 'react'
import login from '../api/login'
import * as SecureStore from 'expo-secure-store'
import { AUTHENTICATION_KEY, AUTO_LOGIN_ENABLED_KEY } from '../data/Constants'

export const AuthStateContext = createContext(null)
export const AuthFunctionContext = createContext(null)

const AuthProvider = ({
  children
}: any) => {
  const [state, dispatch] = useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            isLoggedIn: true,
            userToken: action.token
          }
        case 'SIGN_OUT':
          return {
            ...prevState,
            isLoggedIn: false,
            userToken: null
          }
      }
    },
    {
      isLoading: true,
      isLoggedIn: false,
      userToken: { id: null, pw: null }
    }
  )

  const authenticateFromStorage = async () => {
    let storedPrivacy
    let storedAutoLoginEnabled

    try {
      storedAutoLoginEnabled = await SecureStore.getItemAsync(AUTO_LOGIN_ENABLED_KEY)

      if (storedAutoLoginEnabled === null || storedAutoLoginEnabled === 'false') return
      storedPrivacy = await SecureStore.getItemAsync(AUTHENTICATION_KEY)
      // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
      const privacy = JSON.parse(storedPrivacy)
      await login(privacy.id, privacy.pw)
      dispatch({ type: 'SIGN_IN', token: privacy })
    } catch (e) {
      throw e
    }
  }

  useEffect(() => {
    authenticateFromStorage()
  }, [])

  const authFuncton = useMemo(
    () => ({
      signIn: async ({
        id,
        pw
      }: any) => {
        try {
          await login(id, pw)

          const storedPrivacy = JSON.stringify({ id, pw })
          SecureStore.setItemAsync(AUTHENTICATION_KEY, storedPrivacy)

          dispatch({ type: 'SIGN_IN', token: { id, pw } })
        } catch (e) {
          throw e
        }
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' })
    }),
    []
  )

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <AuthStateContext.Provider value={state}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <AuthFunctionContext.Provider value={authFuncton}>{children}</AuthFunctionContext.Provider>
    </AuthStateContext.Provider>
  )
}

export default AuthProvider
