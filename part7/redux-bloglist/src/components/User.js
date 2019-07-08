import React from 'react'

const User = ({ user }) => {
  if (user === undefined) {
    return null
  }
  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      {user.blogs.map(b =>
        <li key={b.id}>
          {b.title}
        </li>
      )}
    </div>
  )
}

export default User