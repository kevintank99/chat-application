const http = require('http')
const express = require('express')
const { initialiseSocket } = require('./socketHandler')
const router = require('./router')
const config = require('./config')
const app = express()
const db = require('./db')
db()
app.use(express.json())
app.use(express.urlencoded({extended: true}))/

app.use(`/api/${config.version}`, router)
const server = http.createServer(app)
initialiseSocket(server)

server.listen(config.port,()=>{
console.log("server connected at 3000");
})