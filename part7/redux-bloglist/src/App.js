import React from 'react'
import Notification from './components/Notification'
import { connect } from 'react-redux'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'

const App = (props) => {

  if (props.loginSituation.loggedIn === false) {
    return (
      // eslint-disable-next-line react/no-unknown-property
      <div className = 'container'>
        <Notification />
        <LoginForm />
      </div>

    )
  }

  return (
    // eslint-disable-next-line react/no-unknown-property
    <div className = 'container'>
      <h2>Blog Application</h2>
      <p>{props.loginSituation.user.username} logged in</p>
      <Notification />
      <Menu />
    </div>
  )

}
const mapStateToProps = (state) => ({
  loginSituation: state.loginSituation
})
export default connect(mapStateToProps)(App)
