import mongoose from "mongoose";

const { Schema } = mongoose;

const topupsSchema = Schema({ 
  adminId: { type: String },
  userId: { type: String }, 
  amount: { type: Number }, 
  requestStatus: { type: String }
}, {
  timestamps: true
});

export default mongoose.model("Topups", topupsSchema);
