const express = require('express');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const connectionSchema = Schema({
  fromSponserId: { type: String, required: true, ref: 'User' },
  toSponserId: { type: String, required: true, ref: 'User' },  
  connected: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model("Connection", connectionSchema);
