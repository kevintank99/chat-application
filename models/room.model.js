const { Schema, model } = require('mongoose')


const roomSchema = new Schema({
    room_name: {
        type: String,
        required: true,
        unique: true
    },
    users: {
        type: [String],
        default: []
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true, collection: 'rooms', versionKey: false
})

const RoomModel = model('rooms', roomSchema)

module.exports = RoomModel