const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      _id:false
    },
    mensProduct: [
      {
        type: Schema.Types.ObjectId,
        ref: "Men",
        _id:false
      },
    ],
    womensProduct: [
      {
        type: Schema.Types.ObjectId,
        ref: "Women",
        _id:false
      },
    ]
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
