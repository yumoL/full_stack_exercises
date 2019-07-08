import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'


const BlogList = (props) => {

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  return (
    <div id='toDetail'>
      <Table striped>
        <tbody>
          {props.blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>)}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => ({
  blogs: state.blogs
})

export default connect(mapStateToProps,
  { initializeBlogs, setNotification, clearNotification }
)(BlogList)