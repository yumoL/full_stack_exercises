import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import NewAnecdote from './components/NewAnecdote'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {

  useEffect(()=>{
    props.initializeAnecdotes()
  },[])

  return (
    <div>
      <div>
        <Notification />
      </div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <NewAnecdote />
    </div>
  )
}

export default connect (null, { initializeAnecdotes })(App)
