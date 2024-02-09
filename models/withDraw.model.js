import mongoose from "mongoose";

const { Schema } = mongoose;

const withDrawSchema = Schema({ 
  adminId: { type: String },
  userId: { type: String }, 
  amount: { type: Number }, 
  requestStatus: { type: String }
}, {
  timestamps: true
});

export default mongoose.model("WithDraw", withDrawSchema);
