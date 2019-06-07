import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'this is title',
  author: 'this is author',
  url: 'this is url',
  likes: 10,
  user: {
    username: 'username',
    name: 'real name',
    id: '5cf1107e06323842622bc10f'
  },
  id: '5cf110da06323842622bc111'
}

it('defaultly only author and title are shown', () => {
  const component = render (
    <Blog blog={blog} />
  )
  const titleAndAuthor = component.getByText(`${blog.title} ${blog.author}`)
  expect(titleAndAuthor).toBeDefined()
  expect(component.container).not.toHaveTextContent(`${blog.url}`)
  expect(component.container).not.toHaveTextContent(`added by ${blog.user.username}`)
  expect(component.container).not.toHaveTextContent('like')
})

it('after clicking details are shown', () => {
  const component = render (
    <Blog blog={blog} />
  )
  const div=component.getByText(`${blog.title} ${blog.author}`)
  fireEvent.click(div)

  expect(component.container).toHaveTextContent(`${blog.title} ${blog.author}`)
  expect(component.container).toHaveTextContent(`${blog.url}`)
  expect(component.container).toHaveTextContent(`added by ${blog.user.username}`)
  expect(component.container).toHaveTextContent('like')
})


