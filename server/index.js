const http = require('http')
const { WebSocketServer } = require('ws')

const url = require('url')
const { measureMemory } = require('vm')
const uuidv4 = require("uuid").v4

const server = http.createServer()
const wsServer = new WebSocketServer({ server })
const port = 8000
// diccionario para guardar los usuarios conectados y hacer un 
// bradcast; loop q itera cada uuid con connection.send
const connections = { }
// diccionario para los usuarios conectados y la posicion del mouse
const user = { }

const handleMessage = (bytes, uuid) => { // los mensajes llegan como bytes y hay q pasarlos a formato json
  const message = JSON.parse(bytes.toString())
  user.state = message
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

  connection[uuid] = connection

  user[uuid] = {
    "username": username,
    "state": { }
  }

  connection.on("message", message => handleMessage(message, uuid))
  connection.on("close", () => handleClose(uuid))

})

server.listen(port, () => {
  console.log(`WebSocket server running on port ${port}`)
})

