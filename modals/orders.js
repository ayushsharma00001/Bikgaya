const mongoose = require("mongoose");
const Cart = require("./cart");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      _id:false
    },
    mensProducts: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Men",
          _id:false
        },
        quantity: {
          type: Number,
          default: 1,
          _id:false
        },
      },
    ],
    womensProducts: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Women",
          _id:false
        },
        quantity: {
          type: Number,
          default: 1,
          _id:false
        },
      },
    ],
    addressId: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
      _id:false
    },
    payment:{
      type:String,
      default:"cod"
    },
    totalprice:{
      type:Number,
      required:true
    },
    status:{
      type:String,
      default:"Processing",
      enum:["Processing" , "Shipped" , "Delivered" , "Failed"]
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
