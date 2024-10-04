const router = new require('express').Router({mergeParams: true})
const userRouter = require('./user.routes')
const roomRouter = require('./room.routes')
const chatRouter = require('./chat.routes')


router.use('/user', userRouter)
router.use('/room', roomRouter)
router.use('/chats', chatRouter)
module.exports = router