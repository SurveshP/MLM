const express = require('express');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemsSchema = Schema({
  company_id:{ type: mongoose.Schema.Types.ObjectId, ref: "Company", required: [true, "Please enter company_id"] }, 
  itemName: { type: String, required: [true, "Please enter the name of the item"], trim: true },
  description: { type: String, required: [true, "Please enter a description for the item"], trim: true },
  price: { type: Number, required: [true, "Please enter the price of the item"], min: [0, "Price cannot be negative"] },
  quantityInStock: { type: Number, required: [true, "Please enter the quantity in stock"], min: [0, "Quantity cannot be negative"] },
  isAvailable: {  type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
  itemsCategories_id:{ type: mongoose.Schema.Types.ObjectId, ref: "ItemsCategories" },
  del_status: { type: String, enum: { values: ["Live", "Deleted"], message: "Value is not matched" },  default: "Live" }
});

module.exports = mongoose.model("Items", itemsSchema);
