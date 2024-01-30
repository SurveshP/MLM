const express = require('express');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemsCategoriesSchema = Schema({
  itemCategoryName: { type: String, trim: true },
  description: { type: String, trim: true },
  items_id:{ type: String },
  disabled: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model("ItemsCategories", itemsCategoriesSchema);
