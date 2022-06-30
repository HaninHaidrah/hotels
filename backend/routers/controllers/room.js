const { sequelize } = require("../../models/index");
const { Op } = require("sequelize");
const uuid = require("uuid");

const addRoom = async (req, res) => {
  const roomId = uuid.v4();
  try {
    const { roomName, roomDescription, roomFacilites } = req.body;
    const newRoom = await sequelize.models.Rooms.create({
      roomName,
      roomDescription,
      roomFacilites,
      roomId: roomId,
      record_status: "latest",
    });
    res.status(200).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const allRooms = await sequelize.models.Rooms.findAll({
      where: {
        record_status: "latest",
      },
    });
    res.status(200).json(allRooms);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const updateRooms = async (req, res) => {
  try {
    /// to Get All Hotels :
    const id = req.params.id;
    const rooms = req.body;

  
    const oneRoom = await sequelize.models.Rooms.findOne({
      where: {
        record_status: "latest",
        roomId: id,
      },
    });
    ////////////////////////// update the hotel status: ///////////////////////////////////////////////////

    const updateRooms = await sequelize.models.Rooms.update(
      {
        record_status: "updated",
      },
      {
        where: {
          roomId: id,
        },
      }
    );

    /////////////////////// update rooms  updatedD status ///////////////////////////////

    const newRoom = await sequelize.models.Rooms.create({
      roomName: rooms.roomName,
      roomDescription: rooms.roomDescription,
      roomFacilites: rooms.roomFacilites,
      roomId: id,
      hotelId:rooms.hotelId,
      record_status: "latest",
    });

    res.status(200).json(newRoom);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllRooms,
  addRoom,
  updateRooms
};
