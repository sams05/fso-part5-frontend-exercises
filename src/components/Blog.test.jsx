import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog>', () => {
  let container
  beforeEach(() => {
    const loggedInUser = { token: 'akljagwlrq', username: 'Bret', name: 'Leanne Graham' }
    const blog = {
      title: 'Generic JS Blog',
      author: 'John Doe',
      url: 'example.com',
      likes: 132,
      user: {
        username: 'Bret',
        name: 'Leanne Graham',
        id: 'jkh326kj4v',
      },
    }
    const updateBlog = vi.fn()
    const deleteBlog = vi.fn()
    container = render(<Blog loggedInUser={loggedInUser} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />).container
  })

  test('Shows just title and author by default', () => {
    const blogHeading = container.querySelector('.blog-heading')
    const blogDetails = container.querySelector('.blog-details')

    expect(blogHeading).not.toHaveStyle('display: none')
    expect(blogDetails).toHaveStyle('display: none')
  })
})
