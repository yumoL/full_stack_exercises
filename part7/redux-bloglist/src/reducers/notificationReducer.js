const initialState = {
  message:'',
  success: true
}
const notificationReducer = (state = initialState, action) => {
  if (action.type === 'SET_NOTIFICATION') {
    const newState = {
      message: action.message,
      success:action.success
    }
    return newState
  } else if (action.type === 'CLEAR_NOTIFICATION') {
    return initialState
  }
  return state
}

export const setNotification = (message, success,seconds) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message,
      success,
    })
    setTimeout(() => {
      dispatch({
        type:'CLEAR_NOTIFICATION'
      })
    },seconds*1000)
  }
}

export const clearNotification = () => (
  {
    type: 'CLEAR_NOTIFICATION'
  }
)
export default notificationReducer