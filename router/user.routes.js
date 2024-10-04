const {Router} =  require('express')
const {userController} = require('../controllers')
const userRouter = new Router({mergeParams: true})

userRouter.post('/create',userController.createNewUser)


module.exports = userRouter