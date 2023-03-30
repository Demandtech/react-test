import React, { useReducer } from 'react'
import MkdSDK from './utils/MkdSDK'

export const AuthContext = React.createContext()

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      //TODO
      return {
        ...state,
        isAuthenticated: true,
        role: action.payload,
        token: localStorage.getItem('token'),
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

let sdk = new MkdSDK()

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem('role')
  if (errorMessage === 'TOKEN_EXPIRED') {
    dispatch({
      type: 'Logout',
    })
    window.location.href = '/' + role + '/login'
  }
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  React.useEffect(() => {
    //TODO
    sdk.check(state.role)
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
