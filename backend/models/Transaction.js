const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const TransactionSchema = new Schema({
  purpose: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
});

const TransactionModel = model("Transaction", TransactionSchema);

module.exports = TransactionModel;
