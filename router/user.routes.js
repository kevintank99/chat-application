const {Router} =  require('express')
const {userController} = require('../controllers')
const userRouter = new Router({mergeParams: true})

userRouter.post('/create',userController.createNewUser)
userRouter.post('/login', userController.loginUser)

module.exports = userRouter