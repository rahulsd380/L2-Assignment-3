import { TBike } from "./bikes.interface";
import { Bike } from "./bikes.model";

const createBike = async (payload: TBike) => {
  const result = await Bike.create(payload);
  return result;
};


const getAllBikes = async () => {
  const result = await Bike.find();
  return result;
}

export const BikeServices = {
  createBike,
  getAllBikes
};