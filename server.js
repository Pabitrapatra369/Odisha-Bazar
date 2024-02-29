//this will be the starting file of the project

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const server_config = require("./configs/server.config");
const db_config = require("./configs/db.config");
const user_model = require("./models/user.model");
const bcrypt = require("bcryptjs");

//create an admin user at the starting of the application if not already present

//connection with mongo database
mongoose.connect(db_config.DB_URL);

const db = mongoose.connection;

db.on("error", () => {
  console.log("Error while connecting to the mongodb");
});
db.once("open", () => {
  console.log("connected to mongodb");
  init();
});

async function init() {
  try {
    let user = await user_model.findOne({ UserId: "admin" });
    if (user) {
      console.log("Admin is already present");
      return;
    }
  } catch (err) {
    console.log("error while reding the data", err);
  }

  try {
    user = await user_model.create({
      name: "Pabitra",
      UserId: "admin",
      email: "pabitra@gmail.com",
      userType: "ADMIN",
      password: bcrypt.hashSync("welcome1", 8),
    });
    console.log("admin  created ", user);
  } catch (error) {
    console.log("error while create admin ", error);
  }
}
//start the server

app.listen(server_config.PORT, () => {
  console.log("server started at port no:", server_config.PORT);
});
