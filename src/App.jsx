import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const userJson = window.localStorage.getItem('blogAppUser')
    if (userJson) {
      const user = JSON.parse(userJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    const user = await loginService.login({ username, password })
    setUser(user)
    window.localStorage.setItem('blogAppUser', JSON.stringify(user))
    blogService.setToken(user.token)
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('blogAppUser')
    blogService.setToken(null)
  }

  const handleNewBlog = async (e) => {
    e.preventDefault()

    const newBlog = await blogService.create({ title, author, url })
    setBlogs(blogs.concat(newBlog))
  }

  const main = () => {
    if (user === null) {
      return (
        <div>
          <h2>log in to application</h2>
          <form onSubmit={handleLogin}>
            <div>
              username
              <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
              password
              <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      )
    }

    return (
      <div>
        <h2>blogs</h2>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
        <h2>create new</h2>
        <form onSubmit={handleNewBlog}>
          <div>
            title:
            <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
          </div>
          <div>
            author:
            <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
          </div>
          <div>
            url:
            <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
          </div>
          <button type="submit">create</button>
        </form>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    )
  }

  return <div>{main()}</div>
}

export default App
