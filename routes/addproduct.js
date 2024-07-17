const express = require("express");
const Product = require("../models/product.model");

const router = express.Router();

// Route to add a new product
router.post("/api/addproduct", async (req, res) => {
  try {
    const { productName, productDescription, productPrice, productLenght } =
      req.body;

    // Convert productLenght and productPrice to numbers
    const productLenghtData = Number(productLenght);
    const productPriceData = Number(productPrice);

    // Check if the conversion resulted in NaN
    if (isNaN(productLenghtData) || isNaN(productPriceData)) {
      return res
        .status(400)
        .send("Error: productPrice and productLenght must be valid numbers.");
    }

    // Create a new product instance
    const product = new Product({
      productName,
      productDescription,
      productPrice: productPriceData,
      productLenght: productLenghtData,
    });

    // Save the product to the database
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while adding the product." });
  }
});

module.exports = router;
