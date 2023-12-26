const mongoose = require("mongoose");

const Orders = new mongoose.Schema(
  {
    walletaddre: {
      type: String,
      require: true,
    },
    pincode: {
      type: String,
      require: true,
    },
    maxunit: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    user: {
      type: String,
      require: true,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userid",
    },
     status: {
      type: String,
      default: "BUY",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", Orders);
