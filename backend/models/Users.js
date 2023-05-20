const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  username: {
    type: String,
    required: true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Use a regular expression to check if the email has one of the allowed domains
        return /^(\w+@(cse|civil|me|ece|ee|ei)\.nits\.ac\.in)$/.test(value);
      },
      message: 'Email must be a valid email address with the domain @cse.nits.ac.in, @civil.nits.ac.in, @me.nits.ac.in, @ece.nits.ac.in, @ee.nits.ac.in, or @ei.nits.ac.in.'
    }
  },
  branch: {
    type: String,
    enum: ["CSE", "Civil", "ME", "ECE", "EE", "EI"],
    required: true,
  },
  // scholarId: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   validate: {
  //     validator: function (value) {
  //       // Use a regular expression to check if the scholar ID matches the required format
  //       return /^221\d{4}$/.test(value);
  //     },
  //     message: 'Scholar ID must begin with "221" and have 7 numeric characters.'
  //   }
  // },
  // other fields in your schema
});
// });

const UserModel = mongoose.model("users", UserSchema)
module.exports= UserModel;