import React from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import UserList from './UserList'
import User from './User'
import BlogList from './BlogList'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { logout } from '../reducers/loginReducer'

const BlogListAndCreation = () => {
  return (
    <div>
      <BlogForm />
      <BlogList />
    </div>

  )
}

const Menu = (props) => {

  const padding = {
    paddingRight: 5
  }

  const userById = (id) => {
    return props.users.find(u => u.id === id)
  }

  const blogById = (id) => {
    return props.blogs.find(b => b.id === id)
  }

  return (
    <div>
      <div>
        <Button variant="primary" onClick={() => props.logout()}>logout</Button>
      </div>
      <Router>
        <div>
          <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#" as="span">
                    <Link style={padding} to='/users'>all users</Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link style={padding} to='/blogs'>all blogs</Link>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>

            </Navbar>
          </div>
          <Route exact path='/blogs' render={() => <BlogListAndCreation />} />
          <Route exact path='/users' render={() => <UserList />} />
          <Route exact path='/users/:id' render={({ match }) => <User user={userById(match.params.id)} />} />
          <Route exact path='/blogs/:id' render={({ match }) => <Blog blog={blogById(match.params.id)} />} />
        </div>
      </Router>
    </div>)
}

const mapStateToProps = (state) => ({
  users: state.users,
  blogs: state.blogs
})

export default connect(mapStateToProps, { logout })(Menu)
