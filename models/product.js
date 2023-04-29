const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const FURNITUREUSEREC = mongoose.model("FURNITUREUSEREC");

const productSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    mrp:{
      type: Number,
      required: true,
    },
    salesprice:{
      type: Number,
      required: true,
    },
    stock:{
      type: Number,
      required: true,
    },
    tagline:{
      type: String,
      required: true,
    },
    uploadedBy:{
      type: ObjectId,
      ref: "FURNITUREUSEREC"
    }
  },
  { timestamps: true }
);

mongoose.model("FURNITUREPRODUCTEC", productSchema);
