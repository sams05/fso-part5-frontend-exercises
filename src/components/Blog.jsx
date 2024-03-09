import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [detailVisible, setDetailVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const pStyle = {
    marginBlock: 2,
  }

  const showWhenVisible = {
    display: detailVisible ? '' : 'none',
  }

  const incrementLikes = () => {
    const {id, title, author, url, likes, user: {id: user}} = blog
    // Increase likes by 1
    updateBlog(id, {title, author, url, likes: likes + 1, user})
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setDetailVisible(!detailVisible)}>{detailVisible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        <p style={pStyle}>{blog.url}</p>
        <p style={pStyle}>likes {blog.likes} <button onClick={incrementLikes}>like</button></p>
        <p style={pStyle}>{blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog
