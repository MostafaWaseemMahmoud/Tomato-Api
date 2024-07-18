const express = require("express");
const Product = require("../models/product.model");
const Cart = require("../models/cart.model");
const router = express.Router();

// Route to delete a product from the cart
router.post("/api/buyproduct", async (req, res) => {
  try {
    const { productId, cartuserid } = req.body;

    // Fetch cart details
    const cart = await Cart.findOne({ userCartId: cartuserid });

    if (!cart) {
      return res.status(404).send("Cart not found.");
    }

    // Find the index of the product in the cart
    const productIndex = cart.cartProducts.findIndex(
      (cartProduct) => cartProduct._id.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).send("Product not found in cart.");
    }

    // Remove the product from the cart
    cart.cartProducts.splice(productIndex, 1);

    // Save the updated cart
    await cart.save();

    console.log(
      `==> Product Deleted From The (Cart) Of This User: ${cartuserid} <==`
    );

    // Find the product to update its length
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send("Product not found.");
    }

    // Decrement the product length
    product.productLenght -= 1;

    // Save the updated product
    await product.save();

    console.log("PRODUCT length DECREMENTED SUCC");

    res
      .status(200)
      .send("Product Is Deleted And PRODUCT length DECREMENTED SUCC");
  } catch (err) {
    console.error(
      "Error occurred while removing the product from the cart:",
      err
    );
    res.status(500).json({
      error: "An error occurred while removing the product from the cart.",
    });
  }
});

module.exports = router;
