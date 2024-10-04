const { Schema, model} = require('mongoose')


const userSchema =new Schema ({
    username:{
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true, collection:'users', versionKey: false
})

const UserModel = model('users', userSchema)

module.exports = UserModel