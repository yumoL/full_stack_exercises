import React, { useState } from 'react'

const Blog = (props) => {
  const [showDetail, setShowDetail] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButton = props.sameUser === true
    ? <button onClick={props.handleRemove}>remove</button>
    : null

  if (showDetail) {
    return (
      <div style={blogStyle}>
        <div onClick={() => setShowDetail(!showDetail)} >
          {props.blog.title} {props.blog.author}
        </div>
        <div>
          {props.blog.url}
        </div>
        <div>
          <button onClick={props.handleLike}>like</button>
          {props.blog.likes}
        </div>
        <div>
          added by {props.blog.user.username}
        </div>
        <div>
          {removeButton}
        </div>
      </div>
    )
  }
  return (
    <div style={blogStyle} className='blog'>
      <div onClick={() => setShowDetail(!showDetail)}>
        {props.blog.title} {props.blog.author}
      </div>

    </div>
  )

}

export default Blog