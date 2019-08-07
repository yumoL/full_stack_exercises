import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useApolloClient } from '@apollo/react-hooks'

export const FIND_BOOKS_BY_GENRE = gql`
  query findBooksByGenre($genreToSearch: String!) {
    allBooks(genre: $genreToSearch){
      title
      author {name}
      published
    }
  }
`

const Books = (props) => {
  const client = useApolloClient(FIND_BOOKS_BY_GENRE)
  const [booksToShow, setBooksToShow] = useState([...props.result.data.allBooks])

  if (props.result.loading) {
    return (
      <div>loading...</div>
    )
  }

  if (!props.show) {
    return null
  }

  const showBooksByGenre = async (genre) => {
    const { data } = await client.query({
      query: FIND_BOOKS_BY_GENRE,
      variables: { genreToSearch: genre },
      fetchPolicy: 'no-cache'
    })
    setBooksToShow(data.allBooks)

  }


  const books = props.result.data.allBooks
  const genres = [...books.map(b => b.genres)]
  const distinctGenres = [...new Set([].concat.apply([], genres))]

  const booksDetails = () => {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
            </th>
              <th>
                published
            </th>
            </tr>
            {booksToShow.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>
      {booksDetails()}
      <div>
        Select by genres
        {distinctGenres.map(g => <button key={g} onClick={() => showBooksByGenre(g)}>{g}</button>)}
        <button onClick={() => setBooksToShow(books)}>all genres</button>
      </div>
    </div>
  )
}

export default Books