import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const userJson = window.localStorage.getItem('blogAppUser')
    if (userJson) {
      setUser(JSON.parse(userJson))
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = await loginService.login({ username, password })
    setUser(user)
    window.localStorage.setItem('blogAppUser', JSON.stringify(user))
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('blogAppUser')
  }

  const main = () => {
    if (user === null) {
      return (
        <div>
          <h2>log in to application</h2>
          <form onSubmit={handleSubmit}>
            <label>
              username
              <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
            </label>
            <br />
            <label>
              password
              <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
            </label>
            <br />
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
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    )
  }

  return <div>{main()}</div>
}

export default App
