const http = require('http')
const { WebSocketServer } = require('ws')

const server = http.createServer()
const wsServer = new WebSocketServer({ server })
const port = 8000

server.listen(port, () => {
  console.log(`WebSocket server running on port ${port}`)
})

