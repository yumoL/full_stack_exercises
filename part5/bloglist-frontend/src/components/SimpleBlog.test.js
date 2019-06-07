import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

const blog = {
  title: 'this is title',
  author: 'this is author',
  likes: 10
}

it('renders title, author and likes', () => {
  const component = render (
    <SimpleBlog blog ={blog} />
  )

  const titleAndAuthor = component.getByText('this is title this is author')
  expect(titleAndAuthor).toBeDefined()
  const likes = component.getByText(`blog has ${blog.likes} likes`)
  expect(likes).toBeDefined()
})

it('clicking the button twice calls the event handler twice',() => {
  const mockHandler = jest.fn()
  const { getByText }=render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )
  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)


})