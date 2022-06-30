const express = require("express");
const app = express();
const cors = require("cors");
// require("./db/db");
const { sequelize } = require("./models/index");
const hotelRoute=require("./routers/routes/hotel")
const roomRoute=require("./routers/routes/room")


sequelize.sync({alter:true});
app.use(express.json());
app.use(cors());

app.use("/hotels",hotelRoute)
app.use("/rooms",roomRoute)


////////////////////////////
const Port = 5000;
app.listen(Port, () => {
  console.log("server is running");
});
