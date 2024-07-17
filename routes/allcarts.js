const express = require("express");
const cart = require("../models/cart.model");

const router = express.Router();

// Route to get all users
router.get("/api/allcarts", async (req, res) => {
  try {
    const allCarts = await cart.find({});
    res.status(200).json(allCarts);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
});

module.exports = router;
