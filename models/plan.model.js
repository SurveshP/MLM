import mongoose from "mongoose";

const { Schema } = mongoose;

const planSchema = Schema(
  {
    typeOfPlan: String,
    levelIncome: Boolean, //Level Or Sponsor Income
    levels: {
      level: {
        type: Number,
        min: 1,
        max: 16,
      },
      people: {
        type: Number,
        min: 3,
      },
      amount: {
        type: Number,
      },
    },
    pairIncome: Boolean,
    pairs: {
      level: {
        type: Number,
        min: 3,
        max: 16,
      },
      amount: {
        type: Number,
      },
    },
    minPV: {
      // PV (POINT VOLUME)
      type: Number,
      default: 250,
    },
    pricePerPV: {
      type: Number, // In Rupess (Rs)
      default: 6,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Plan", planSchema);
