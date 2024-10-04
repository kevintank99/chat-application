const { Router } = require('express')
const { roomController } = require('../controllers')
const roomRouter = new Router({ mergeParams: true })

roomRouter.post('/create', roomController.createNewRoom)
roomRouter.get('/', roomController.getActiveRooms)

module.exports = roomRouter