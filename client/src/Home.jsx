import useWebSocket from 'react-use-websocket'
import throttle from 'lodash.throttle'
import { useEffect } from 'react'

export function Home({ username }) {

  const WS_URL = 'ws://127.0.0.1:8000'
  // useWebSocket se usa para inicializar la conexion ws con el servidor; necesita url, q se le puede
  // agregar una query --> el hook devuelve funcion sendJSONmessage para mandar mensajes al servidor
  const { sendJsonMessage } = useWebSocket(WS_URL, {
    queryParams: { username }
  })

  // throttle(sendJsonMessage, )

  // useEffect(() =>{

  // }, [])

  return(
    <>
      <h1>Hola {username}</h1>
    </>
  )
}