import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const CertainUser = ({ user }) => {
  return (
    <tr>
      <td>
        <Link to={`/users/${user.id}`}>{user.username}</Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

const UserList = (props) => {

  useEffect(() => {
    props.initializeUsers()
  }, [])

  return (
    <div>
      <h2>All Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <th>username</th>
            <th>added blogs</th>
          </tr>
          {props.users.map(user => <CertainUser key={user.id} user={user} />)}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => ({
  users: state.users
})

export default connect(mapStateToProps,
  { initializeUsers })(UserList)