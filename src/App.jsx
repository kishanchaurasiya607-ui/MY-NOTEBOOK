import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './page/Home'
import Notes from './components/Notes'
import About from './page/About'
import Contact from './page/Contact'
import Login from './components/Login'
import Signup from './components/Signup'
import CreateNote from './components/CreateNote'
import ErrorPage from './page/ErrorPage'
import { useContext, useEffect } from 'react'
import { useTheme } from './context/ThemeState'
import authContext from './context/authContext'
import Profile from './page/Profile'
import MyNotes from './page/MyNotes'
function App() {

  const { theme } = useTheme()

  const { token, getProfile } = useContext(authContext)

  console.log(theme)

  useEffect(() => {
    let HtmlElm = document.querySelector('html')
    HtmlElm.classList.remove('light', 'dark')
    HtmlElm.classList.add(theme)
  }, [theme])


  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }

    getProfile()
  }, [])


  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/mynotes' element={<MyNotes />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/createnote' element={token ? <CreateNote /> : <Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
