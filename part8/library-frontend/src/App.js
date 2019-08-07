import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import BirthYearForm from './components/BirthYearForm'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

const ALL_AUTHORS = gql`
{
  allAuthors  {
    name
    born
    bookCount
  }
}
`
const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author {name}
    published
    genres
  }
`
const ALL_BOOKS = gql`
{
  allBooks {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

const ME = gql`
{
  me {
    favoriteGenre
  }
}
`

const CREATE_BOOK = gql`
mutation addBook($title:String!, $published:Int!, $author:String!, $genres:[String!]!){
  addBook(
    title:$title,
    published: $published,
    author:$author,
    genres:$genres
  ){
    ...BookDetails
  }
}
${BOOK_DETAILS}
`
const EDIT_BIRTHYEAR = gql`
mutation editBirthYear($name:String!,$birth:Int!){
  editAuthor(name:$name,setBornTo:$birth){
    name
    born
    bookCount
    id
  }
}
`
const LOGIN = gql`
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password) {
      value
    }
  }
  `
const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

const App = () => {
  const [page, setPage] = useState('authors')
  // const [showRecommendations, setShowRecommendations] = useState(false)
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const allAuthorsData = useQuery(ALL_AUTHORS)
  const allBooksData = useQuery(ALL_BOOKS)
  const userData = useQuery(ME)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, id) => {
      return set.map(b => b.id).includes(id)
    }

    const booksDataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(booksDataInStore.allBooks, addedBook.id)) {
      booksDataInStore.allBooks.push(addedBook)
      client.writeQuery({
        query: ALL_BOOKS,
        data: booksDataInStore
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`Book ${addedBook.title} has been added`)
      updateCacheWith(addedBook)
    }
  })

  const client = useApolloClient()

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }] //also ALL_AUTHORS?
  })

  const [editBirthYear] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  if (allAuthorsData.loading || allBooksData.loading) {
    return (
      <div>
        loading...
      </div>
    )
  }

  const commonView = () => {
    return (
      <div>
        {errorNotification()}
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
        </div>
        <div>
          <Authors
            show={page === 'authors'} result={allAuthorsData}
          />
          <Books
            show={page === 'books'} result={allBooksData}
          />
        </div>
      </div>
    )
  }



  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        {commonView()}
        <LoginForm
          show={page === 'login'} login={login} setToken={(token) => setToken(token)}
        />
      </div>
    )
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>
      {commonView()}

      <BirthYearForm show={page === 'authors'} result={allAuthorsData} editBirthYear={editBirthYear}
      />
      <NewBook
        show={page === 'add'} addBook={addBook}
      />
      <Recommendations show={page === 'recommend'} user={userData} books={allBooksData} />

    </div>
  )
}

export default App