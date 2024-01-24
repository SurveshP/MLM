const express = require('express');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = Schema({
  company_id:{ type: mongoose.Schema.Types.ObjectId, ref: "Company", required: [true, "Please enter company_id"] }, 
  username: { type: String, maxlength: [50, "Maximum 50 charcters are permitted"], minLength: [5, "name should have more than 5 character"], required: [true, "Please enter a name"],  trim: true, default: null, },
  contactNumber: { type: Number, min: [1000000000, "phone number should be equal 10 digit"], max: [9999999999, "phone number should be equal 10 digit"], required: [true, "Please enter a phone number"], default: null, },
  email_address: { type: String, unique: true, required: [true, "Please enter an email"] },
  password: { type: String, minLength: [6, "Password should have more than 6 characters"], required: [true, "please enter password"], trim: true },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  order_id:[ { type: mongoose.Schema.Types.ObjectId, ref: "Orders" }],
  del_status: { type: String, enum: { values: ["Live", "Deleted"], message: "Value is not matched" }, default: "Live" },
});

module.exports = mongoose.model("User", userSchema);
