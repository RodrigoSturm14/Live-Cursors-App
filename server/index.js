const http = require('http')
const { WebSocketServer } = require('ws')

const url = require('url')
const { measureMemory } = require('vm')
const uuidv4 = require("uuid").v4

const server = http.createServer()
const wsServer = new WebSocketServer({ server })
const port = 8000
// diccionario q guarda las uuid; las uuid guardan las "connection" de cada usuario conectado
// sirve para hacer un brodcast; loop q itera cada uuid y manda la posicion del mouse con "connection.send"
const connections = { }
// diccionario para los usuarios conectados y la posicion del mouse
const users = { }

const brodcast = () =>{
  // convirtiendo connections en un array e itereandolo
  Object.keys(connections).forEach(uuid => {
    // guardando cada "connection" de los uuid en "connection"
    const connection = connections[uuid]
    console.log(connection)
    // mandar el mensaje actualizado de la posicion del mouse a cada cliente
    const message = JSON.stringify(users)
    connection.send(message)
  })
}

const handleMessage = (bytes, uuid) => { // los mensajes llegan como bytes y hay q pasarlos a formato json
  const message = JSON.parse(bytes.toString())
  // actualizar posicion del mouse del usuario que mando la posicion del mouse
  const user = users[uuid]
  user.state = message

  brodcast()
  console.log(message)
  // { "x":150, "y":130 }
}

const handleClose = (uuid) => {

}

wsServer.on("connection", (connection, request) =>{
  // ws://localhost:8000?username=rodri --> el ? es una query
  const { username } = url.parse(request.url, true).query // recuperar url y obtener username de la query
  const uuid = uuidv4()
  console.log(username)
  console.log(uuid)

  connections[uuid] = connection
  console.log(connections)

  users[uuid] = {
    username: username,
    state: { }
  }

  connection.on("message", message => handleMessage(message, uuid))
  connection.on("close", () => handleClose(uuid))

})

server.listen(port, () => {
  console.log(`WebSocket server running on port ${port}`)
})

