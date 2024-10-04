const { ChatModel } = require('../models');

const createChat = async (user_id, room_id, message) => {
	const newChat = new ChatModel({ user_id, room_id, message })
	return await newChat.save();
}

const getChats = async (room_id) =>{
  return await ChatModel.find({room_id: room_id})
}

module.exports = {
	createChat,
	getChats
}