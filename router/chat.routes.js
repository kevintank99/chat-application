const {Router} =  require('express')
const {chatController} = require('../controllers')
const chatRouter = new Router({mergeParams: true})

chatRouter.get('/',chatController.getChatByRoom)


module.exports = chatRouter