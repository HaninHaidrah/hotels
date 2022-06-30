const express = require("express");
const hotelRoute = express.Router();

const {
  addHotel,
  getAllHotels,assignHotelstoRooms,getAllHotelRooms,updateHotels
 
} = require("../controllers/hotel");

hotelRoute.get("/", getAllHotels);
hotelRoute.post("/", addHotel);
hotelRoute.put("/:hotelId", updateHotels);
hotelRoute.get("/hotelRooms/:hotelId", getAllHotelRooms);



module.exports = hotelRoute;