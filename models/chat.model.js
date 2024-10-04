const { Schema, model } = require('mongoose')

const chatSchema = new Schema({
    room_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref : "rooms"
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required : true,
        ref : "users"
    },
    message : {
        type : String,
        required : true
    },
}, {
    timestamps: true, collection: 'chats', versionKey: false
})

const ChatModel = model('chats', chatSchema)

module.exports = ChatModel