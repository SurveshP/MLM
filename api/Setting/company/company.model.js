const express = require('express');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = Schema({
  companyName: { type: String, maxlength: [50, "Maximum 50 charcters are permitted"], minLength: [5, "name should have more than 5 character"], required: [true, "Please enter a name"],  trim: true, default: null, },
  contactNumber: { type: Number, min: [1000000000, "phone number should be equal 10 digit"], max: [9999999999, "phone number should be equal 10 digit"], required: [true, "Please enter a phone number"], default: null, },
  email_address: { type: String, unique: true, required: [true, "Please enter an email"] },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  del_status: { type: String, enum: { values: ["Live", "Deleted"], message: "Value is not matched" },  default: "Live" },
  user_id:[ { type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  item_id:[ { type: mongoose.Schema.Types.ObjectId, ref: "Items" }]
});

module.exports = mongoose.model("Company", companySchema);
