const express = require('express');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = Schema({
  company_id:{ type: mongoose.Schema.Types.ObjectId, ref: "Company", required: [true, "Please enter company_id"] }, 
  sponserId: { type: String },
  wallet: { type: Number, default: 0 },
  userName: { type: String, required: true },
  position: { type: String, enum: ['Left', 'Right'], required: true },
  type: { type: String, enum: ['Admin', 'User'], required: true },
  contactNumber: { type: Number },
  location: { type: String },
  emailAddress: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  disabled: { type: Boolean, default: false },
}, {
  timestamps: true
});

const adminCollectionSchema = Schema({
  sponserId: { type: String },
  walletAmount: { type: Number, default: 0 },
  type: { type: String, enum: ['Add', 'WithDrawal'], required: true },
}, {
  timestamps: true
});


// Export both models separately
const UserModel = mongoose.model("User", userSchema);
const AdminModel = mongoose.model("Requests", adminCollectionSchema);

module.exports = {
  UserModel,
  AdminModel
};