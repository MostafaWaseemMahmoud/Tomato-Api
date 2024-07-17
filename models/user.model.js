const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  profilepic: {
    type: String,
    required: false,
    default:
      "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User; // Use ES6 export
