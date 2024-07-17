const express = require("express");
const Product = require("../models/product.model");

const router = express.Router();

// Route to get all users
router.post("/api/addproduct", async (req, res) => {
  try {
    const { productName, productDescription, productPrice, productLenght } =
      req.body;
    const productLenghtData = Number(productLenght);
    const productPriceData = Number(productPrice);
    const product = new Product({
      productName,
      productDescription,
      productPrice: productPriceData,
      productLenght: productLenghtData,
    });
    product
      .save()
      .then(() => {
        res.status(201).send(product);
      })
      .catch((err) => {
        res.status(400).send("Error creating Product: " + err);
      });
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
});

module.exports = router;
