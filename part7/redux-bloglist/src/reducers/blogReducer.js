import blogService from '../services/blogs'

const byLikes = (b1, b2) => b2.likes - b1.likes

const blogReducer = (state = [], action) => {
  if (action.type === 'INIT_BLOGS') {
    return action.data.sort(byLikes)
  }
  if (action.type === 'NEW_BLOG') {
    console.log('data',action.data)
    return state.concat(action.data).sort(byLikes)
  }
  if (action.type === 'LIKE' ) {
    return state.map(a => a.id !== action.data.id ? a : action.data)
      .sort(byLikes)
  }
  if(action.type === 'COMMENT') {
    return state.map(a => a.id !== action.data.id ? a : action.data)
      .sort(byLikes)
  }
  return state
}

export const createBlog = (newObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(newObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data,
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const liked = { ...blog, likes: blog.likes + 1 }
    const data = await blogService.update(liked)
    dispatch({
      type: 'LIKE',
      data,
    })
  }
}

export const commentBlog = (blog, newComment) => {
  return async (dispatch) => {
    const commented = { ...blog, comments: blog.comments.concat(newComment) }
    const data = await blogService.update(commented)
    dispatch({
      type: 'COMMENT',
      data,
    })
  }
}

export default blogReducer