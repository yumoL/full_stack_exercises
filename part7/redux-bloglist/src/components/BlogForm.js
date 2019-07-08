import React from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'
const NewBlog = (props) => {

  const handleSubmit = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    try {
      props.createBlog({
        title: title,
        author: author,
        url: url
      })
      newBlogRef.current.toggleVisibility()
      props.setNotification(`You added blog ${title}`, true, 5)
      //newBlogRef.current.toggleVisibility()
    } catch (exception) {
      props.setNotification('Something wrong happend, please try again', false, 5)
    }
  }

  const newBlogRef = React.createRef()

  return (
    <div>
      <Togglable buttonLabel='create new' ref={newBlogRef}>
        <div>
          <h2>Create new</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>title</Form.Label>
              <Form.Control id='title' type="text" name="title"/>
              <Form.Label>author</Form.Label>
              <Form.Control id='author' type="text" name="author"/>
              <Form.Label>url</Form.Label>
              <Form.Control id='url' type="text" name="url"/>
              <Button variant="primary" type="submit" >add a blog</Button>
            </Form.Group>
          </Form>
        </div>
      </Togglable>
    </div>
  )
}

const mapStateToProps = (state) => ({
  loginSituation: state.loginSituation
})

export default connect(
  mapStateToProps,
  { createBlog, setNotification }
)(NewBlog)