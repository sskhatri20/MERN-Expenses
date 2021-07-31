const http = require('http')
const app = require('./app')
const Port = process.env.PORT || 8000

const server = http.createServer(app)

server.listen(Port,console.log("Server is Up and Running on Port ",Port))