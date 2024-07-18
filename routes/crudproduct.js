// routes/crudproduct.js

const express = require("express");
const Product = require("../models/product.model"); // Ensure this path is correct
const multer = require("multer");
const path = require("path");
const router = express.Router();
let originalNameValue = "";

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    originalNameValue = file.originalname;
  },
});

const upload = multer({ storage });

// Route to add a new product
router.post("/api/addproduct", upload.single("image"), async (req, res) => {
  const protocol = req.protocol;
  const host = req.get("host");
  try {
    const { productName, productDescription, productPrice, productLenght } =
      req.body;
    const imageUrl = `${protocol}://${host}/images/${originalNameValue}`;

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
      productImg: imageUrl,
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

// Route to delete a product
router.delete("/api/removeproduct", async (req, res) => {
  const { productid } = req.body;
  try {
    if (!productid) {
      return res.status(400).send("Error: productid is required.");
    }

    const product = await Product.findByIdAndDelete(productid);
    if (!product) {
      return res.status(404).send("Product Not Found");
    }

    res.status(200).send("Product Deleted");
  } catch (err) {
    console.error("Error occurred while deleting the product:", err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the product." });
  }
});

module.exports = router;
