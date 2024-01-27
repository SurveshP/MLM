const express = require('express');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = Schema({
  company_id:{ type: mongoose.Schema.Types.ObjectId, ref: "Company", required: [true, "Please enter company_id"] }, 
  sponserId: { type: String },
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


module.exports = mongoose.model("User", userSchema);
