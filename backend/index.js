require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Transaction = require("./models/Transaction.js");
const mongoose = require("mongoose");
const app = express();
const PORT = 4000;

app.use(cors()); //applying cors middleware to express application
app.use(express.json());

app.post("/api/transaction", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { purpose, price, date, description } = req.body;
  const transaction = await Transaction.create({
    purpose,
    price,
    date,
    description,
  });
  res.json(transaction);
});

app.get("/api/transactions", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const transactions = await Transaction.find();
  res.json(transactions);
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
