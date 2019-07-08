import axios from 'axios'

// eslint-disable-next-line no-undef
const baseUrl = BACKEND_URL+'/api/blogs'

let token = null

const getConfig = () => ({
  headers: { Authorization: token }
})

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const destroyToken = () => {
  token = null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  console.log('token', token)
  const response = await axios.post(baseUrl, newObject, getConfig())
  console.log(response.data)
  return response.data
}

const update = async newObject => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`,newObject,getConfig())
  return response.data
}

const remove = async object => {
  const response = await axios.delete(`${baseUrl}/${object.id}`,getConfig())
  return response.data
}

export default {
  getAll,
  getConfig,
  setToken,
  destroyToken,
  create,
  update,
  remove
}