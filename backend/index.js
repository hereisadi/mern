const express = require("express");
const app = express();
const mongoose = require("mongoose");

const UserModel = require("./models/Users");

const cors = require("cors")
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://mongoformerntry:iopryeuisf54@cluster0.1tslte4.mongodb.net/merntutorial?retryWrites=true&w=majority"
);

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

app.post("/createUser", async (req, res) => {
    // const ip = req.ip;
  const user = req.body;
 

  const newUser = new UserModel(user); //creating new user
  await newUser.save()

  res.json(user);
});



app.listen(3001, () => {
  console.log("server started.");
});
