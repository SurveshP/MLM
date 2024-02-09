import mongoose from "mongoose";

const { Schema } = mongoose;

const adminSchema = Schema({
  adminId: { type: String },
  adminName: { type: String, required: true },
  contactNumber: { type: Number, required: true },
  emailAddress: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model("Admin", adminSchema);
