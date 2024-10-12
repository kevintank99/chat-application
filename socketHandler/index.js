const socketIO = require("socket.io");
const { roomServices, userServices, chatServices } = require("../services");

const socketHandler = (server) => {
  const io = socketIO(server);

  io.on("connection", (socket) => {
    console.log("Socket connection established");

    const username = socket.handshake.headers.username;
    
    if (!username) {
      return socket.disconnect(true); // Disconnect if username is missing
    }

    socket.on("joinRoom", async (payload) => {
      try {
        const roomName = payload?.room_name;
        await handleJoinRoom(socket, roomName, username);
      } catch (error) {
        console.error("Error joining room:", error);
        socket.emit("error", "An error occurred while joining the room.");
      }
    });

    socket.on("disconnect", async () => {
      try {
        await handleDisconnect(username);
      } catch (error) {
        console.error("Error during disconnect:", error);
      }
    });
  });
};

const handleJoinRoom = async (socket, roomName, username) => {
  if (!roomName) {
    return socket.emit("message", "Room name is missing.");
  }

  const user = await userServices.checkUserExists(username);
  if (!user) {
    return socket.emit("message", "Username is not registered.");
  }

  let room = await roomServices.checkRoomExists(roomName);
  if (!room) {
    room = await roomServices.createRoom(roomName); // Automatically create room if not exists
  }

  const isRoomActive = await roomServices.isRoomActive(roomName);
  if (!isRoomActive) {
    return socket.emit("message", `${roomName} is not active anymore.`);
  }

  const isUserInRoom = await roomServices.checkUserInRoom(roomName, user._id);
  if (!isUserInRoom) {
    socket.join(roomName); // Join socket to room
    await roomServices.addUserToRoom(roomName, user._id);
    await emitMessageToRoom(socket, "message", `${username} has joined the room`, roomName);
  } else {
    socket.emit("message", "You are already in this room.");
  }

  socket.on("chatMessage", async (message) => {
    try {
      await handleChatMessage(socket, roomName, user._id, message);
    } catch (error) {
      console.error("Error sending chat message:", error);
      socket.emit("error", "An error occurred while sending the message.");
    }
  });
};

const handleChatMessage = async (socket, roomName, userId, message) => {
  const room = await roomServices.checkRoomExists(roomName);
  if (!room) {
    return socket.emit("message", "Room no longer exists.");
  }

  await Promise.all([
    emitMessageToRoom(socket, "message", `${socket.handshake.headers.username}: ${message}`, roomName),
    chatServices.createChat(userId, room._id, message),
  ]);
};

const handleDisconnect = async (username) => {
  const user = await userServices.checkUserExists(username);
  if (user) {
    await roomServices.removeUserFromAllRooms(user._id);
  }
};

const emitMessageToRoom = (socket, event, message, roomName) => {
  socket.to(roomName).emit(event, message);
};

module.exports = {
  socketHandler,
};
