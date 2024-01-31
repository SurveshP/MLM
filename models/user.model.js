import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = Schema({
  company_id:{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }, 
  sponsorId: { type: String },
  fromSponsorId: { type: String },
  userName: { type: String },
  position: { type: String, enum: ['Left', 'Right'] },
  type: { type: String, enum: ['Admin', 'User'] },
  contactNumber: { type: Number },
  location: { type: String },
  emailAddress: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  disabled: { type: Boolean, default: false },
}, {
  timestamps: true
});

export default model("User", userSchema);
