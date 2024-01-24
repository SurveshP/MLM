const express = require('express');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemsCategoriesSchema = Schema({
  itemCategoryName: { type: String, required: [true, "Please enter the item category name"],  trim: true },
  description: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now  },
  items_id:[ { type: mongoose.Schema.Types.ObjectId, ref: "Items" }],
  del_status: { type: String, enum: { values: ["Live", "Deleted"], message: "Value is not matched" },  default: "Live" }
});

module.exports = mongoose.model("ItemsCategories", itemsCategoriesSchema);
