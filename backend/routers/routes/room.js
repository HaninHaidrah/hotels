const express = require("express");
const roomRoute = express.Router();

const { addRoom, getAllRooms,updateRooms } = require("../controllers/room");

roomRoute.get("/", getAllRooms);
roomRoute.post("/", addRoom);

roomRoute.put("/:id", updateRooms);
// roomRoute.delete("/cars/:id", deleteCar);

module.exports = roomRoute;
