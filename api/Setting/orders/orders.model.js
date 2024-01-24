const express = require('express');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ordersSchema = Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "Please enter the user ID"] },
  items: [{ itemsId: { type: mongoose.Schema.Types.ObjectId, ref: "Items"}, quantity: { type: Number, min: 0, default: 0 } }],
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Processing', 'Completed'],  default: "Pending" },
  createdAt: { type: Date, default: Date.now },
  del_status: { type: String, enum: { values: ["Live", "Deleted"], message: "Value is not matched" },  default: "Live" }
});

module.exports = mongoose.model("Orders", ordersSchema);
