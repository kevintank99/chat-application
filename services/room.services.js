const { RoomModel } = require('../models');

const checkUserInRoom = async (room_name, userId) => {
	return await RoomModel.findOne({
		room_name: room_name,
		users: { $in: [userId] }
	});
}
const createRoom = async (room_name) => {
  const newRoom = new RoomModel({ room_name })
    return await newRoom.save();
}

const addUserToRoom = async (roomName, userId) =>  {
	const result = await RoomModel.updateOne(
			{ room_name: roomName },     
			{ $push: { users: userId } }  
	);
 }

 const getActiveRooms = async () => {
   const data = await RoomModel.find({
	   is_active: true
	})
	return data
 }

const removeUserFromAllRooms = async (userId) => {
  const result = await RoomModel.updateMany(
    { users: userId }, 
    { $pull: { users: userId } } 
  );
};

const checkRoomExists = async (room_name) => {
	return await RoomModel.findOne({ room_name })
}

const isRoomActive = async (room_name, is_active) => {
	return await RoomModel.findOne({room_name, is_active})
}
module.exports = {
	createRoom,
	checkRoomExists,
	isRoomActive,
	checkUserInRoom,
	addUserToRoom,
	removeUserFromAllRooms,
	getActiveRooms
}