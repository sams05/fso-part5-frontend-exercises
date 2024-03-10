import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    container = render(
      <Blog loggedInUser={loggedInUser} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
    ).container
  })

  test('Shows just title and author by default', () => {
    const blogHeading = container.querySelector('.blog-heading')
    const blogDetails = container.querySelector('.blog-details')

    expect(blogHeading).not.toHaveStyle('display: none')
    expect(blogDetails).toHaveStyle('display: none')
  })

  test('Shows blog details when the view button is clicked', async () => {
    const user = userEvent.setup()
    // Make sure button is labeled "view" when details are hidden
    const viewToggleBtn = screen.getByText('view')
    await user.click(viewToggleBtn)
    const blogDetails = container.querySelector('.blog-details')
    expect(blogDetails).not.toHaveStyle('display: none')
  })
})
