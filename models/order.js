const mongoose = require("mongoose");
const FURNITUREUSEREC = mongoose.model("FURNITUREUSEREC");
const FURNITUREPRODUCTEC = mongoose.model("FURNITUREPRODUCTEC");


const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FURNITUREUSEREC",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "FURNITUREPRODUCTEC",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    deliveryAddress: {
      type: String,
      required: true,
    },
    boughtBy:{
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Confirmed", "Packing", "Shipped", "Delivered","Canceled"],
      default: "Confirmed",
    },

    
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("FURNITUREORDEREC", orderSchema);

module.exports = Order;
