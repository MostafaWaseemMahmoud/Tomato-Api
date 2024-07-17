const express = require("express");
const product = require("../models/product.model");

const router = express.Router();

// Route to get all users
router.get("/api/allproducts", async (req, res) => {
  try {
    const allProducts = await product.find({});
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
});

module.exports = router;
