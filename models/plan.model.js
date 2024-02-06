import mongoose from "mongoose";

const { Schema } = mongoose;

const planSchema = Schema(
  {
    typeOfPlan:String
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Plan", planSchema);