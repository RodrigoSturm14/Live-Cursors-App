import useWebSocket from 'react-use-websocket'
import throttle from 'lodash.throttle'
import { Cursor } from './components/Cursor.jsx'
import { useEffect, useRef } from 'react'

export function Home({ username }) {

  const WS_URL = 'ws://127.0.0.1:8000'
  // useWebSocket se usa para inicializar la conexion ws con el servidor; necesita url, q se le puede
  // agregar una query --> el hook devuelve funcion sendJSONmessage para mandar mensajes al servidor
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    queryParams: { username }
  })

  // sendJsonMessageThrottled es una copia de la funcion sendJsonMessage pero con el timer de 50ms
  const THROTTLE = 50
  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE))

  const renderCursors = ( users ) =>{
    return Object.keys(users).map((uuid) =>{
      const user = users[uuid]
      return(
        <Cursor key={uuid} point={[user.state.x, user.state.y]}/>
      )
    })
  }

  useEffect(() =>{

    console.log('hola render')
    sendJsonMessage({
      x: 0,
      y: 0
    })
    // subcripcion al evento mousemove y declaracion del evento; cada vez q 
    // ocurra el eventos, se envia mensaje json 
    // la subcripcion al evento se ejecuta una sola vez, por q esta en el useEffect
    window.addEventListener("mousemove", (e) =>{
      sendJsonMessageThrottled.current({ 
        x: e.clientX,
        y: e.clientY
      })
    })
  }, [])
  // el componente se re-renderiza cada vez q el useWebSocket se usa, o sea cada 
  // vez q hace una accion (enviar json, conectarse al server, etc.)
  if(lastJsonMessage){
    return(
      <>
        {renderCursors(lastJsonMessage)}
      </>
    )
  }
  return(
    <>
      <h1>Hola {username}</h1>
    </>
  )
}