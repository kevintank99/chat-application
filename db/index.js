const {db} = require('../config')
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
		await mongoose.connect(db, {useUnifiedTopology: true}, {userNewUrlParser: true})
		console.log("database connected");
		

  } catch(e) {
		console.error("database connection failed", e)
  }
}



module.exports = connectDB