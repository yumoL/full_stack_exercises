import anecdoteService from '../services/anecdotes'
const byVotes = (a, b) => b.votes - a.votes

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const votedAnecdote = action.data
      return state.map(a => a.id !== votedAnecdote.id ? a : votedAnecdote).sort(byVotes)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }

}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const voteAnecdote = (allAnecdotes, id) => {
  const anecdoteToVote = allAnecdotes.find(a=>a.id===id)
  return async dispatch => {
    const votedAnecdote= await anecdoteService.update({
      ...anecdoteToVote,
      votes: anecdoteToVote.votes+1
    })
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export default reducer