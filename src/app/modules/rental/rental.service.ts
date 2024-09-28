import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Bike } from '../bikes/bikes.model';
import { TRental } from './rental.interface';
import { Rental } from './rental.model';
import mongoose from 'mongoose';

const createRental = async (userId: string, bikeId: string, startTime: Date): Promise<TRental> => {

  if (!mongoose.Types.ObjectId.isValid(bikeId)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid bike ID');
  }

  const bike = await Bike.findById(bikeId);
  console.log(bike?.isAvailable);

  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
  }

  if (!bike.isAvailable) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Bike is not available');
  }

  bike.isAvailable = false;
  await bike.save();
  
  // Create rental
  const rental = await Rental.create({
    userId,
    bikeId,
    startTime,
    returnTime: null,
    totalCost: 0,
    isReturned: false,
  });

  return rental;
};

const returnBike = async (rentalId: string): Promise<TRental> => {
  const rental = await Rental.findById(rentalId);

  if (!rental) {
    throw new AppError(httpStatus.NOT_FOUND, 'Rental not found');
  }

  // if (rental.userId.toString() !== userId) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized to return');
  // }

  const bike = await Bike.findById(rental.bikeId);

  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
  }

  const returnTime = new Date();
  const rentalDurationInHours = (returnTime.getTime() - rental.startTime.getTime()) / (1000 * 60 * 60);
  const totalCost = rentalDurationInHours * bike.pricePerHour;

  rental.returnTime = returnTime;
  rental.totalCost = totalCost;
  rental.isReturned = true;
  await rental.save();

  bike.isAvailable = true;
  await bike.save();

  return rental;
};

const getAllRentals = async () => {
  const rentals = await Rental.find();
  return rentals;
};

const getAllRentalsForUser = async (userId: string): Promise<TRental[]> => {
  const rentals = await Rental.find({ userId });
  return rentals;
};

export const RentalServices = {
  createRental,
  returnBike,
  getAllRentalsForUser,
  getAllRentals
};
