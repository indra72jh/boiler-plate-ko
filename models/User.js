const mogoose = require("mongoose");

const userSchema = mogoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    defult: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

const User = mogoose.model("User", userSchema);

module.exports = { User };
