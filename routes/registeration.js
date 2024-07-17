const express = require("express");
const multer = require("multer");
const path = require("path");
const User = require("../models/user.model");

const router = express.Router();

let originalNameValue = "";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images")); // Correct path
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    originalNameValue = file.originalname; // Save the original file name
  },
});

const upload = multer({ storage });

// Route to add a new user
router.post("/api/registratoin", upload.single("image"), (req, res) => {
  const imageUrl = `http://localhost:5500/images/${originalNameValue}`; // Construct the URL for the uploaded image

  const { firstname, lastname, email, password } = req.body; // Extract user details from the request body

  const newUser = new User({
    firstname,
    lastname,
    email,
    password,
    profilepic: imageUrl,
  });

  // Save the new user to the database
  newUser
    .save()
    .then(() => {
      res.status(201).send(newUser); // Respond with the created user on success
    })
    .catch((err) => {
      res.status(400).send("Error creating user: " + err); // Respond with an error message on failure
    });
});

module.exports = router;
