const express = require("express");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const router = express.Router();

// Route to add a product to a user's cart
router.post("/api/addcart", async (req, res) => {
  try {
    const { productid, usercartid } = req.body;

    // Validate input
    if (!productid || !usercartid) {
      return res
        .status(400)
        .json({ error: "Product ID and User Cart ID are required." });
    }

    const userCart = await Cart.findOne({ userCartId: usercartid });
    if (!userCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const product = await Product.findById(productid);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Ensure cartProducts array exists
    if (!userCart.cartProducts) {
      userCart.cartProducts = [];
    }

    userCart.cartProducts.push(product);
    await userCart.save();

    console.log("Product Added Successfully To Cart");
    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while adding product to cart." });
  }
});

module.exports = router;
