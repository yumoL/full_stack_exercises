import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { FIND_BOOKS_BY_GENRE } from './Books'

const Recommendations = (props) => {
  const client = useApolloClient(FIND_BOOKS_BY_GENRE)
  const [booksToShow, setBooksToShow] = useState([])

  useEffect(() => {

    const showBooksByGenre = async () => {
      const { data } = await client.query({
        query: FIND_BOOKS_BY_GENRE,
        variables: { genreToSearch: props.user.data.me.favoriteGenre },
        fetchPolicy: 'no-cache'
      })
      setBooksToShow(data.allBooks)

    }
    showBooksByGenre()
  }, [props.books.data.allBooks])

  if (props.user.loading) {
    return (
      <div>loading...</div>
    )
  }

  if (!props.show) {
    return null
  }


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
      <h2>recommendations</h2>
      <p>books in your favourite genre <b>{props.user.data.me.favoriteGenre}</b></p>
      {booksDetails()}
    </div>
  )
}

export default Recommendations
