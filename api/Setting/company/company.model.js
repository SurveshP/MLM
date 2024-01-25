const express = require('express');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = Schema({
  sponserId: { type: String },
  companyName: { type: String, required: true },
  contactNumber: { type: Number, required: true },
  emailAddress: { type: String, required: true },
  type: { type: String, enum: ['Admin', 'User'], required: true },
  user_id:[ { type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  item_id:[ { type: mongoose.Schema.Types.ObjectId, ref: "Items" }],
  disabled: { type: Boolean, default: false },
}, {
  timestamps: true
});

module.exports = mongoose.model("Company", companySchema);
