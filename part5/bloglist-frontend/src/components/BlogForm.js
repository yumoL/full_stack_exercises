import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleCreate, handleTitleChange, handleAuthorChange, handleUrlChange, title, author, url }) => (
  <form onSubmit={handleCreate}>
    <div>
      Title
      <input
        type="text"
        value={title}
        name="title"
        onChange={handleTitleChange}
      />
    </div>
    <div>
      Author
      <input
        type="text"
        value={author}
        name="author"
        onChange={handleAuthorChange}
      />
    </div>
    <div>
      Url
      <input
        type="text"
        value={url}
        name="url"
        onChange={handleUrlChange}
      />
    </div>
    <button type="onSubmit">add the blog</button>
  </form>
)

BlogForm.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}
export default BlogForm