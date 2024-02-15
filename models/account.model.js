import mongoose from "mongoose";

const { Schema } = mongoose;

const accountSchema = Schema({
  userId: { type: String },
  IFSCCode: { type: String },
  paymentType: { type: String },
  bankName: { type: String },
  accountNo: { type: Number },
  accountHolderName: { type: String },
  accountType: { type: String },
  bankBranch: { type: String },
  default: { type: Boolean, default: "false" }
}, {
  timestamps: true
});

export default mongoose.model("Account", accountSchema);