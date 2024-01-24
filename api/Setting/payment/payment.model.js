const express = require('express');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentSchema = Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  paymentMode: { type: String,  enum: ["Cash", "CreditCard", "DebitCard", "Other"], default: "Cash" },
  amountPaid: { type: String,  required: true },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  del_status: { type: String, enum: { values: ["Live", "Deleted"], message: "Value is not matched" },  default: "Live" },
});

module.exports = mongoose.model("Payment", paymentSchema);
