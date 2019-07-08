/* eslint-disable no-trailing-spaces */
import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = (props) => {

  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''

    props.login(username, password)
  }

  if (props.loginSituation.loggedIn === false) {

    props.setNotification('wrong username or password', false, 5)

    return (
      <div>
        <h2>Login to the application</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username</Form.Label>
            <Form.Control id='username' type="text" name="username" />
            <Form.Label>password</Form.Label>
            <Form.Control id='password' type="password" name="password" />
            <Button variant="primary" type="submit">login</Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
  return null
}

const mapStateToProps = (state) => {
  const loginSituation = state.loginSituation
  return {
    loginSituation
  }
}

export default connect(mapStateToProps, {
  setNotification, login
})(LoginForm)