const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userCartId: { type: String, required: true },
  cartProducts: [],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart; // Use ES6 export
