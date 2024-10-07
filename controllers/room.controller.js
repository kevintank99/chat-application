const { roomServices } = require("../services");

const createNewRoom = async (req, res) => {
  try {
    const { room_name } = req.body;
    if (!room_name) {
      res.status(400).json({ message: "room name missing" });
    }
    const existingRoom = await roomServices.checkRoomExists(room_name);

    if (existingRoom) {
      res.status(400).json({ message: "Room already exists" });
    }
    const newRoom = await roomServices.createRoom(room_name);
    return res.status(201).json({
      message: "Room created successfully",
    });
  } catch (error) {
    console.log("Error Creating room");
    res.status(500).json({ message: "Something went wrong" });
  }
};
const getActiveRooms = async (req, res) => {
  try {
    const rooms = await roomServices.getActiveRooms();
    res.status(200).json({ data: rooms });
  } catch (error) {
    console.log("Error while fetching room");
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createNewRoom,
  getActiveRooms,
};
