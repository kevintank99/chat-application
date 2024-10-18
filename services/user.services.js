const {UserModel} = require('../models')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwt_secret, jwt_expiration} = require('../config')
console.log();
const createUser = async (username, password) => {
  const hashedPassword = bcrypt.hashSync(password, 10)
  const user = new UserModel({username, password:hashedPassword})
  return await user.save()
}

const checkUserExists = async (username)=>{
  return await UserModel.findOne({username})
}

const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, jwt_secret, {
      expiresIn: jwt_expiration
  });
};

const verifyToken = (token) => {


return jwt.verify(token, jwt_secret, (err, decoded) => {
  if (err) {
      console.error('Token verification failed:', err);
      return false
  } else {
      return decoded
  }
});
};

module.exports = {
    createUser,
    checkUserExists,
    generateToken,
    verifyToken
}