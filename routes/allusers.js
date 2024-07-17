const express = require("express");
const User = require("../models/user.model");

const router = express.Router();

// Route to get all users
router.get("/api/allusers", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
});

module.exports = router;
