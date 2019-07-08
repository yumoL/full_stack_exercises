import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = (props) => {

  const alertVariant = props.notification.success === false
    ? 'danger'
    : 'success'

  if (props.notification.message.length === 0) {
    return null
  }

  return (
    <div className="container">
      <Alert variant={alertVariant}>
        {props.notification.message}
      </Alert>
    </div>
  )
}

const mapStateToProps = (state) => {
  const notification = state.notification
  return {
    notification
  }
}

export default connect(
  mapStateToProps
)(Notification)
