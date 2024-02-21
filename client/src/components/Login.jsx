import { useState } from "react"

export function Login({ updateUsername }){
  const [username, setUsername] = useState("")

  return(
    <>
      <h1>Live Cursors App</h1>
      <p>Ingresar nombre de usuario</p>
      <form 
        onSubmit={(event) => {
          event.preventDefault()
          updateUsername(username)
        }}>

        <input 
          type="text" 
          placeholder="username"
          value={username}
          // cuando se 
          onChange={(event) => setUsername(event.target.value)}
        />
        <input type="submit"/>
      </form>
    </>
  )
}