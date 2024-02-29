const mongoose = require("mongoose");

/*
name
userId
password
email
usertype
*/
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    UserId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 10,
      unique: true,
    },
    userType: {
      type: String,
      default: "CUSTOMER",
      enum: ["CUSTOMER", "ADMIN"],
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
