const express = require("express");
const multer = require("multer");
const path = require("path");
const User = require("../models/user.model");
const Cart = require("../models/cart.model");

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
  const protocol = req.protocol;
  const host = req.get("host");
  const imageUrl = `${protocol}://${host}/images/${originalNameValue}`;

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
      const newCart = new Cart({
        userCartId: newUser._id,
        cartProducts: [],
      });
      newCart.save().then(() => {
        console.log("Cart Created to This User: " + newUser._id);
      });
      res.status(201).send(newUser); // Respond with the created user on success
    })
    .catch((err) => {
      res.status(400).send("Error creating user: " + err); // Respond with an error message on failure
    });
});

module.exports = router;
