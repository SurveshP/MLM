const express = require('express');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemsSchema = Schema({
  company_id:{ type: mongoose.Schema.Types.ObjectId, ref: "Company", required: [true, "Please enter company_id"] }, 
  sponserId: { type: String },
  itemName: { type: String, required: [true, "Please enter the name of the item"], trim: true },
  description: { type: String, required: [true, "Please enter a description for the item"], trim: true },
  price: { type: Number, required: [true, "Please enter the price of the item"], min: [0, "Price cannot be negative"] },
  quantityInStock: { type: Number, required: [true, "Please enter the quantity in stock"], min: [0, "Quantity cannot be negative"] },
  itemsCategories_id:{ type: mongoose.Schema.Types.ObjectId, ref: "ItemsCategories" },
  disabled: { type: Boolean, default: false },
}, {
  timestamps: true
});

module.exports = mongoose.model("Items", itemsSchema);
