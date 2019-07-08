import userService from '../services/users'

const userReducer = (state = [], action) => {
  if (action.type === 'INIT_USERS') {
    return action.data
  }

  return state
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const data = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data,
    })
  }
}


export default userReducer