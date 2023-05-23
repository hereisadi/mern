const express = require("express");
const app = express();
const mongoose = require("mongoose");

const UserModel = require("./models/Users");
const bodyParser = require("body-parser");

const nodemailer = require("nodemailer");
app.use(bodyParser.json());
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODBSECRET);


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PWD,
  },
});


let storedOTP = "";
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

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
      res
        .status(500)
        .json({ error: "An error occurred while checking email uniqueness" });
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
      res.status(500).json({
        error: "An error occurred while checking scholarId uniqueness",
      });
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
      res.status(500).json({
        error: "An error occurred while checking username uniqueness",
      });
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

app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  
  const otp = Math.floor(100000 + Math.random() * 900000);

  try {
    
    sendEmail(email, "OTP Verification", `Your OTP is: ${otp}`);

  
    storedOTP = otp.toString();
    res.json({ success: true, otp });
  } catch (error) {
    console.log("Error sending OTP:", error);
    res.status(500).json({ error: "An error occurred while sending the OTP" });
  }
});


app.post("/verify-otp", (req, res) => {
  console.log("Request Body:", req.body);
  const enteredOTP = req.body.otp.toString().trim();
  const storedOTPString = storedOTP.toString().trim();

  console.log("Entered OTP:", enteredOTP);
  console.log("Stored OTP:", storedOTPString);

  if (enteredOTP === storedOTPString) {
    res.status(200).json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ message: "Wrong OTP. Please try again" });
  }
});


app.listen(3001, () => {
  console.log("server started.");
});

