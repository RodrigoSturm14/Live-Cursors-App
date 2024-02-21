//import './App.css'
import { useState } from 'react'
import { Login } from './components/Login.jsx'
import { Home } from './Home.jsx'


function App() {
const [username, setUsername] = useState("")
  return username ? (
    <Home/>
  ) : (
    <Login updateUsername={setUsername} />
  )
}

export default App
