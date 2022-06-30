const { sequelize } = require("../../models/index");
const { Op, DataTypes } = require("sequelize");
const uuid = require("uuid");
const rooms = require("../../models/rooms");

///////////////////////////////////////////////  add Hotel///////////////////////////////////////////////////////////////

const addHotel = async (req, res) => {
  const hotelId = uuid.v4();
  const response = [];

  try {
    const { hotelName, hotelDescription, phone } = req.body.data;
    const rooms = req.body.rooms;
    const newHotel = await sequelize.models.Hotels.create({
      hotelName,
      hotelDescription,
      phone,
      hotelId: hotelId,
      record_status: "latest",
    });

    // Assign the room status to updated

    for (let i = 0; i < rooms.length; i++) {
      await sequelize.models.Rooms.update(
        {
          record_status: "updated",
        },
        {
          where: {
            roomId: rooms[i].roomId,
          },
        }
      );

      // Assign the room to hotelId

      let newRoom = await sequelize.models.Rooms.create({
        roomName: rooms[i].roomName,
        roomDescription: rooms[i].roomDescription,
        roomFacilites: rooms[i].roomFacilites,
        roomId: rooms[i].roomId,
        hotelId: newHotel.hotelId,
        record_status: "latest",
      });

      response.push(newRoom.dataValues);
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

///////////////////////////////////////////Get All Hotels /////////////////////////////////////////////////////////////////////////

const getAllHotels = async (req, res) => {
  try {
    /// to Get All Hotels :
    const response = [];
    const allHotels = await sequelize.models.Hotels.findAll({
      where: {
        record_status: "latest",
      },
    });

    for (let i = 0; i < allHotels.length; i++) {
      let room = await sequelize.models.Rooms.findAll({
        where: {
          record_status: "latest",
          hotelId: allHotels[i].dataValues.hotelId,
        },
      });
      response.push({
        ...allHotels[i].dataValues,
        rooms: room,
      });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//////////////////////////////////////Get All Hotels Rooms /////////////////////////////////////////////////

const getAllHotelRooms = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const allHotels = await sequelize.models.Assign.findAll({
      where: {
        record_status: "latest",
        hotelId: hotelId,
      },
    });
    res.status(200).json(allHotels);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

///////////////////////////////////////// Assign Rooms To Hotels //////////////////////////////////////////////////
const assignHotelstoRooms = async (req, res) => {
  try {
    let { rooms } = req.body;
    const { hotelId } = req.params;

    const oneHotel = await sequelize.models.Hotels.findOne({
      where: {
        record_status: "latest",
        hotelId: hotelId,
      },
    });

    rooms.forEach(async (room) => {
      const assignId = uuid.v4();
      await sequelize.models.Rooms.update(
        {
          hotelId: hotelId,
        },
        {
          where: {
            roomId: room,
          },
        }
      );
    });

    res.status(201).json("its assigned");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

///////////////////////////////////////////////////updateHotels/////////////////////////////////////////////////////////////////////////

const updateHotels = async (req, res) => {
  try {
    /// to Get All Hotels :
    const hotel_id = req.params.hotelId;
    const hotels = req.body;
    const oneHotel = await sequelize.models.Hotels.findOne({
      where: {
        record_status: "latest",
        hotelId: hotel_id,
      },
    });
    ////////////////////////// update the hotel status: ///////////////////////////////////////////////////

    const updatedHotel = await sequelize.models.Hotels.update(
      {
        record_status: "updated",
      },
      {
        where: {
          hotelId: hotel_id,
        },
      }
    );

    /////////////////////// update rooms  updatedD status ///////////////////////////////

    const newHotel = await sequelize.models.Hotels.create({
      hotelName: hotels.hotelName,
      hotelDescription: hotels.hotelDescription,
      rooms: hotels.rooms,
      hotelId: hotel_id,
      phone: hotels.phone,
      record_status: "latest",
    });

    res.status(200).json(newHotel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllHotels,
  addHotel,
  assignHotelstoRooms,
  getAllHotelRooms,
  updateHotels
};
