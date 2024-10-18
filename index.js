const http = require('http')
const express = require('express')
const { socketHandler } = require('./socketHandler')
const router = require('./router')
const config = require('./config')
const app = express()
const db = require('./db')
const morgan = require('morgan');
db()
app.use(express.json())
app.use(express.urlencoded({extended: true}))/
app.use(morgan('combined'))

console.log("config.version", config.version);
app.use(`/api/${config.version}`, router)
const server = http.createServer(app)
socketHandler(server)

server.listen(config.port,()=>{
console.log(`server connected at ${config.port}`);
})