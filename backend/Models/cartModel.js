const mongoose = require("mongoose");
const { default: slugify } = require("slugify");
const CartSchema = new mongoose.Schema({
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
  isFav: {
    type: Boolean,
    requried: [true, "Product is fav or not must be clear."],
  },
  catagory: {
    type: String,
    required: [true, "Product's catagory is required."],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity of a product should be there."],
  },
  slug: String,
  totalPrice: {
    type: Number,
    required: [true, "Please fill total price of this product."],
  },
});

CartSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
  console.log(this);
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
