const socketIO = require('socket.io');
const { roomServices, userServices, chatServices } = require('../services');

const initialiseSocket = (server) => {
   const io = socketIO(server);

   io.on('connection', (socket) => {
      console.log("Socket connection established");

			const username = socket.handshake.headers.username;
      socket.on('joinRoom', async ({ room_name }) => {
         
         if (!room_name) {
            return socket.emit("message", "Room name is missing");
         }
         if (!username) {
            return socket.emit("message", "Username is missing");
         }

         // Check if user exists
         const isUserExists = await userServices.checkUserExists(username);
         if (!isUserExists) {
            return socket.emit("message", "Username is not registered");
         } 

         // Check if room exists, else create it
         const isRoomExists = await roomServices.checkRoomExists(room_name);
         if (!isRoomExists) {
            await roomServices.createRoom(room_name);
         }

         // Check if the room is active or not
         const isActive = await roomServices.isRoomActive(room_name, true);
         if (!isActive) {
            return socket.emit("message", `${room_name} is not active anymore`);
         }

         // Check if user is already in the room
         const isUserJoined = await roomServices.checkUserInRoom(room_name, isUserExists._id);
         if (!isUserJoined) {
            await roomServices.addUserToRoom(room_name, isUserExists._id);
            socket.join(room_name) 
            socket.to(room_name).emit('message', `${username} has joined the room`);
         } else {  
            socket.emit("message", "You are already in this room.");
         }
				 socket.on('chatMessage', async (message)=>{
				 	socket.to(room_name).emit('message', `${username}: ${message}`); 
				 	await chatServices.createChat(isUserExists._id, isRoomExists?._id, message)
				 })
      });

      socket.on('disconnect',async () => {
				const getUser = await userServices.checkUserExists(username);
				await roomServices.removeUserFromAllRooms(getUser?._id)
      });
   });
};

module.exports = {
   initialiseSocket
};
