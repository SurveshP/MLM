import mongoose from "mongoose";
import { nanoid } from 'nanoid';

const { Schema } = mongoose;

const supportSchema = Schema({
  adminId: { type: String },
  userId: { type: String },
  ticketToken: {
    type: String,
    default: () => `TK${nanoid(8)}`
  }, 
  description: { type: String },
  requestStatus: {
    type: String,
    enum: ["Replied", "Not Replied"],
    default: "Not Replied",
  }
}, {
  timestamps: true
});

export default mongoose.model("Support", supportSchema);
