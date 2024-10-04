const { chatServices } = require("../services")

const getChatByRoom = async (req, res) => {
    try {
        const { room_id } = req.query
        if (!room_id) {
            res.status(400).json({
                message:"room_id missing"
            })
        }
        const chats = await chatServices.getChats(room_id)
        return res.json({
            data: chats
        })
    } catch (error) {
        res.status(500).json({
            messasge: "Something went wrong"
        })
    }
}

module.exports = {
    getChatByRoom
}