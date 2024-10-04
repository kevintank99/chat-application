const {UserModel} = require('../models')

const createUser = async (username, password) => {
  const user = new UserModel({username, password})
  return await user.save()
}

const checkUserExists = async (username)=>{
  return await UserModel.findOne({username})
}

module.exports = {
    createUser,
    checkUserExists
}