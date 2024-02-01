import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = Schema({
  categoryName: { type: String },
  description: { type: String },
  disabled: { type: Boolean, default: false }
}, {
  timestamps: true
});

export default mongoose.model("Category", categorySchema);
