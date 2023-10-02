const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "product id is must"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, "User id is must"],
  },
  title: {
    type: String,
    requried: [true, "A product title is must."],
    trim: true,
    maxlength: [20, "Max length for name is 20"],
    minlength: [4, "Minimun length for product name is 4"],
  },
  price: {
    type: Number,
    required: [true, "Product must have a price."],
  },
  images: {
    type: String,
    required: [true, "Product image is must."],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity of a product should be there."],
  },
  totalPrice: {
    type: Number,
    required: [true, "Please fill total price of this product."],
  },
});

const Order = mongoose.model("Orders", OrderSchema);
module.exports = Order;
