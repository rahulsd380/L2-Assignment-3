import { Schema, model } from "mongoose";
import { TBike } from "./bikes.interface";

const bikeSchema: Schema = new Schema<TBike>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    pricePerHour: {
      type: Number,
      required: [true, "Price per hour is required"],
    },
    isAvailable : {type: Boolean, required: true, default: true},
    cc: {
      type: Number,
      required: [true, "CC is required"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
    },
    model: {
      type: String,
      required: [true, "Model is required"],
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Bike = model<TBike>("Bike", bikeSchema);