import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const Blog = (props) => {
  if (props.blog === undefined) {
    return null
  }

  const like = (id) => {
    const liked = props.blogs.find(b => b.id === id)
    props.likeBlog(liked)
    props.setNotification(`You liked blog ${liked.title}`, true, 5)
  }

  const handleComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    try {
      props.commentBlog(props.blog, comment)
      props.setNotification(`You commented blog ${props.blog.title}`, true, 5)
    } catch (exception) {
      props.setNotification('Something wrong happend, please try again', false, 5)
    }
  }

  const detailStyle = {
    background: 'BurlyWood',
    padding: '10px'
  }

  const likes = props.blog.likes === 1
    ? 'like'
    : 'likes'

  const userWhoAddedBlog = props.blog.user.name === undefined
    ? props.loginSituation.user
    : props.blog.user

  return (
    <div>
      <h2>{props.blog.title}</h2>
      <div style={detailStyle}>
        <div>
          <a href={props.blog.url}>{props.blog.url}</a>
        </div>
        <div>
          {props.blog.likes} {likes}
          <button onClick={() => like(props.blog.id)}>like</button>
        </div>
        <div>
          added by {userWhoAddedBlog.name}
          {console.log('check', userWhoAddedBlog)}

        </div>
      </div>

      <div>
        <h3>Comments</h3>
        <div>
          <Form onSubmit={handleComment}>
            <Form.Group>
              <Form.Label>new comment</Form.Label>
              <Form.Control id='comment' type="text" name="comment" />
              <Button variant="primary" type="submit">comment</Button>
            </Form.Group>

          </Form>
        </div>
        {props.blog.comments.map(c => <li key={c}>{c}</li>)}
      </div>
    </div>
  )

}

const mapStateToProps = (state) => ({
  blogs: state.blogs,
  loginSituation: state.loginSituation
})

export default connect(mapStateToProps,
  { setNotification, likeBlog, commentBlog }
)(Blog)
