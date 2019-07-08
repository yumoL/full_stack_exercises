import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route, Link, withRouter
} from 'react-router-dom'

const Menu = (props) => {

  const padding = {
    paddingRight: 5
  }

  const anecdoteById = (id) => {
    return props.anecdotes.find(a => a.id === id)
  }
  return (
    <div>
      <Router>
        <div>
          <div>
            <Link style={padding} to='/'>anecdotes</Link>
            <Link style={padding} to='/create'>create</Link>
            <Link style={padding} to='/about'>about</Link>
            <div>
              {props.notification}
            </div>

          </div>
          <Route exact path='/' render={() => <AnecdoteList anecdotes={props.anecdotes} vote={props.vote} />} />
          <Route path='/create' render={() => <CreateNew addNew={props.addNew} />} />
          <Route path='/about' render={() => <About />} />
          <Route path='/anecdotes/:id' render={({ match }) => <Anecdote anecdote={anecdoteById(match.params.id)} />} />
        </div>
      </Router>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote =>
          <li key={anecdote.id} >
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>)}
      </ul>
    </div>)
}

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <div>
      has {anecdote.votes} votes
    </div>
    <div>
      For more information, see <a href={anecdote.info}>{anecdote.info}</a>
    </div>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNewNoHistory = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    props.history.push('/')
  }


  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )

}

const CreateNew = withRouter(CreateNewNoHistory)

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const notify = (content) => {
    setNotification(content)
    setTimeout(() => setNotification(''), 5000)
  }

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    notify(`a new anecdote '${anecdote.content}' is created`)
  }

  const anecdoteById = (id) => {
    return anecdotes.find(a => Number(a.id) === id)
  }


  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes} addNew={addNew} notification={notification} />
      <em><Footer /></em>
    </div>
  )
}

export default App;