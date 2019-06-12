
const initialState = {
  notify: ''
}

const notificationReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'CLEAR':
      return initialState
    case 'NOTIFY':
      return action.data
    default:
      return state
  }
}

export const setNotification = (notify, timeout = 5) => {
  return async dispatch => {
    await dispatch({
      type: 'NOTIFY',
      data: { notify }
    })
    setTimeout(() => dispatch({ type: 'CLEAR' }), timeout * 1000)
  }
}

export default notificationReducer