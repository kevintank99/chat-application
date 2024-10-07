const socketIO = require("socket.io");
const { roomServices, userServices, chatServices } = require("../services");

const initialiseSocket = (server) => {

  const io = socketIO(server);

  io.on("connection", (socket) => {
    console.log("Socket connection established");

    const username = socket.handshake.headers.username;
    socket.on("joinRoom", async ({ room_name }) => {
      
			await validateRoom(socket, room_name, username)
      // Check if user is already in the room
      const isUserJoined = await roomServices.checkUserInRoom(room_name, isUserExists._id);
      if (!isUserJoined) {
        socket.join(room_name);
        await Promise.all([
          roomServices.addUserToRoom(room_name, isUserExists._id),
          emitMessageToRoom(socket, "message", `${username} has joined the room`, room_name),
        ]);
      } else {
        await emitMessage(socket, "message", `You are already in this room.`);
      }
      socket.on("chatMessage", async (message) => {
        await Promise.all([
          emitMessageToRoom(socket, "message", `${username}: ${message}`, room_name),
          chatServices.createChat(isUserExists._id, isRoomExists?._id, message),
        ]);
      });
    });

    socket.on("disconnect", async () => {
      const getUser = await userServices.checkUserExists(username);
      await roomServices.removeUserFromAllRooms(getUser?._id);
    });
  });
};

const validateRoom = async (socket, room_name, username) =>{

	if (!room_name) {
		await emitMessage(socket, "message", `Room name is missing`);
	}

	if (!username) {
		await emitMessage(socket, "message", `Username is missing`);
	}

	// Check if user exists
	const isUserExists = await userServices.checkUserExists(username);
	if (!isUserExists) {
		await emitMessage(socket, "message", `Username is not registered`);
	}

	// Check if room exists, else create it
	const isRoomExists = await roomServices.checkRoomExists(room_name);
	if (!isRoomExists) {
		await roomServices.createRoom(room_name);
	}

	// Check if the room is active or not
	const isActive = await roomServices.isRoomActive(room_name, true);
	if (!isActive) {
		await emitMessage(socket, "message", `${room_name} is not active anymore`);
	}
}

const emitMessageToRoom = async (socket, event, payload, room) => {
  return await socket.to(room).emit(event, payload);
};

const emitMessage = async (socket, event, payload) => {
  return await socket.emit(event, payload);
};

module.exports = {
  initialiseSocket,
};
