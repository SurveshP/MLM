const express = require('express');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminCollectionSchema = Schema({
  sponserId: { type: String },
  walletAmount: { type: Number, default: 0 },
  type: { type: String, enum: ['Add', 'WithDrawal'], required: true },
}, {
  timestamps: true
});

const AdminModel = mongoose.model("requests", adminCollectionSchema);
//using the model created by userSchema to create a new user
module.exports = {
  AdminModel
};
