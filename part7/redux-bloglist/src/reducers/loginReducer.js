import loginService from '../services/login'
import blogService from '../services/blogs'

let user = JSON.parse(window.localStorage.getItem('user'))
const initialState = user ? { loggedIn: true, user } : { loggedIn: false }

const loginReducer = (state = initialState, action) => {
  if (action.type === 'LOGIN' || action.type === 'LOGOUT') {
    const newState = {
      loggedIn: action.loggedIn,
      user: action.user
    }
    return newState
  }
  return state
}

export const login = (username, password) => {
  return async (dispatch) => {
    let user = null
    try {
      user = await loginService.login({
        username: username,
        password: password
      })
    } catch (error) {
      dispatch({
        type: 'LOGIN',
        loggedIn: false,
        user: user
      })
      return
    }
    window.localStorage.setItem('user', JSON.stringify(user))
    blogService.setToken(user.token)

    dispatch({
      type: 'LOGIN',
      loggedIn: true,
      user: user
    })
  }
}

export const logout = () => {
  return (dispatch) => {
    blogService.destroyToken()
    window.localStorage.removeItem('user')
    dispatch({
      type: 'LOGOUT',
      loggedIn: false,
      user: null
    })
  }
}


export default loginReducer

