const mongoose = require("mongoose");

const SellerSchema = mongoose.Schema({
  price: Number,
  products: Array,
  email: String,
  address: Object,
});

module.exports = mongoose.model("seller", SellerSchema);