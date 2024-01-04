const mongoose = require("mongoose");

const productModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    crops: {
      type: String,
    },
    applications: {
      type: String,
    },
    methodOfUse: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("products", productModel);
module.exports = ProductModel;
