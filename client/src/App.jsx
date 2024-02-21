//import './App.css'
import { useState } from 'react'
import { Login } from './components/Login.jsx'


function App() {
const [username, setUsername] = useState("")
  return (
    <>
      <Login updateUsername={setUsername} />
    </>
  )
}

export default App
