import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  }
  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState({
    message: null
  })
  const byLikes = (a, b) => b.likes - a.likes

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort(byLikes))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //blogService()
    }
  }, [])

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 5000)
  }

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({
        title: title,
        author: author,
        url: url
      })
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      notify(` Blog ${title} by ${author} is added`)
    } catch (exception) {
      notify('There is some mistakes when adding the blog', 'error')
    }

  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const credential = {
      username: username.value,
      password: password.value
    }
    try {
      const user = await loginService.login(credential)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
      notify('Login succeeds')
    } catch (exception) {
      notify('Wrong username or password', 'error')
    }
  }

  const handleLike = async (event, blog) => {
    event.preventDefault()
    const blogToUpdate = blogs.find(b => b.id === blog.id)
    if (blogToUpdate) {
      const updatedBlog = await blogService.update({
        ...blogToUpdate,
        likes: blog.likes + 1
      })
      setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b).sort(byLikes))
    }
  }

  const sameUser = (blog) => {
    return user.username === blog.user.username
  }
  const handleRemove = async (blog) => {
    //const blogToRemove=blogs.find(b=>b.id===blog.id)
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      notify('blog has been removed')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input {...username} reset='0'/>
      </div>
      <div>
        password
        <input {...password} reset='0' />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogFormRef = React.createRef()

  const blogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          handleCreate={handleCreate}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          title={title}
          author={author}
          url={url} />
      </Togglable>
    )
  }

  if (user === null) {
    return (
      <div className='login'>
        <Notification notification={notification} />
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification} />
      <p>{user.username} logged in</p>
      <button onClick={() => window.localStorage.removeItem('loggedUser')}>Logout</button>

      <div>
        <h2>create new</h2>
        {blogForm()}
      </div>

      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} sameUser={sameUser(blog)}
            handleLike={(e) => handleLike(e, blog)}
            handleRemove={() => handleRemove(blog)}
          />
        )}
      </div>
    </div>
  )
}

export default App