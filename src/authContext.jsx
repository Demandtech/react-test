import React, { useReducer } from 'react'
import MkdSDK from './utils/MkdSDK'

export const AuthContext = React.createContext()
const token = localStorage.getItem('token')
const role = localStorage.getItem('role')
const initialState = {
  isAuthenticated: !! token,
  user: null,
  token: token ? token : null,
  role: role ? role : null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      //TODO
      return {
        ...state,
        isAuthenticated: true,
        role: action.payload.role,
        token: localStorage.getItem('token'),
        user:action.payload.user_id
      }
    case 'LOGOUT':
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    default:
      return state
  }
}

export const tokenExpireError = (dispatch, errorMessage) => {
  //const role = localStorage.getItem('role')
  if (errorMessage === 'TOKEN_EXPIRED') {
    dispatch({
      type: 'Logout',
    })
    window.location.href = '/'
  }
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const sdk = new MkdSDK()
  const role = localStorage.getItem('role')
  React.useEffect(() => {
    //TODO
    const checkToken = async (role) => {
      try {
        const checkResult = await sdk.check(role)
        if (!checkResult.message === 'OK') {
          tokenExpireError(dispatch, 'TOKEN_EXPIRED')
        }
      } catch (err) {
        console.log(err)
      }
    }
    checkToken(role)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
