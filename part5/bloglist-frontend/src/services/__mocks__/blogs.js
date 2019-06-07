const blogs = [
  {
    title: 'title1',
    author: 'author1',
    url: 'url1',
    likes: 10,
    user: {
      username: 'yumo',
      name: 'luoyumo',
      id: '5cf1107e06323842622bc10f'
    },
    id: '5cf110da06323842622bc111'
  },
  {
    title: 'title2',
    author: 'author2',
    url: 'url2',
    likes: 3,
    user: {
      username: 'yumo',
      name: 'luoyumo',
      id: '5cf1107e06323842622bc10f'
    },
    id: '5cf128fd3006954ca798f737'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }