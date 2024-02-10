import mongoose from "mongoose";

const { Schema } = mongoose;

const adminSupportSchema = Schema({ 
  adminId: { type: String },
  userId: { type: String }, 
  ticketToken: { type: String }, 
  description: { type: String },
  requestStatus: { type: String }
}, {
  timestamps: true
});

export default mongoose.model("AdminSupport", adminSupportSchema);
