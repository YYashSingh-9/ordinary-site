const mongoose = require("mongoose");

const FavSchema = new mongoose.Schema({
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
  isFav: {
    type: Boolean,
    requried: [true, "Product is fav or not must be clear."],
  },
});

const Favs = mongoose.model("Fav", FavSchema);
module.exports = Favs;
