const express = require("express");
const app = express();
const mongoose = require("mongoose");

const UserModel = require("./models/Users");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODBSECRET);

app.get("/getUsers", (req, res) => {
  //get request to retrieve informsstion from the database to show on the frontend  req:means request get information that is send from the frontend
  // res: response send information from the backend to the frontend; send data to the frontend

  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});


app.post("/check-email", (req, res) => {
  const email = req.body.email;
  UserModel.findOne({ email }, (err, user) => {
    if (err) {
      console.log("Error checking email uniqueness:", err);
      res.status(500).json({ error: "An error occurred while checking email uniqueness" });
    } else {
      const unique = !user;
      res.json({ unique });
    }
  });
});


app.post("/check-scholarid", (req, res) => {
  const scholarId = req.body.scholarId;
  UserModel.findOne({ scholarId }, (err, user) => {
    if (err) {
      console.log("Error checking scholarId uniqueness:", err);
      res.status(500).json({ error: "An error occurred while checking scholarId uniqueness" });
    } else {
      const unique = !user;
      res.json({ unique });
    }
  });
});


app.post("/check-username", (req, res) => {
  const username = req.body.username;
  UserModel.findOne({ username }, (err, user) => {
    if (err) {
      console.log("Error checking username uniqueness:", err);
      res.status(500).json({ error: "An error occurred while checking username uniqueness" });
    } else {
      const unique = !user;
      res.json({ unique });
    }
  });
});

app.post("/createUser", async (req, res) => {
  // const ip = req.ip;
  const user = req.body;

  const newUser = new UserModel(user); //creating new user
  await newUser.save();

  res.json(user);
});

app.listen(3001, () => {
  console.log("server started.");
});
