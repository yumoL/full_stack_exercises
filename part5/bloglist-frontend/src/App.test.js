import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
import App from './App'
jest.mock('./services/blogs')

describe('<App />', () => {
  it('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )
    expect(component.container.querySelector('.login')).toBeDefined()
    expect(component.container.querySelector('.blog')).toBe(null)
  })

  test('if user logged in, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '13878866989',
      name: 'Testaaja'
    }
    localStorage.setItem('loggedUser', JSON.stringify(user))
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('.blog')
    )
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(2)
    expect(component.container).toHaveTextContent('title1 author1')
    expect(component.container).toHaveTextContent('title2 author2')
  })
})