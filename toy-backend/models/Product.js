const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true // image URL / filename
    },
    price: {
      type: Number,
      required: true
    },
    stock: {
      type: Number,
      required: true,
      default: 0
    },
    rating: {
      type: Number,
      default: 4.5 // static, frontend icon dikha dega
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
