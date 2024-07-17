import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { RentalServices } from './rental.service';

const createRental = catchAsync(async (req: Request, res: Response) => {
  const { bikeId, startTime } = req.body;
  const userId = req.user.userId;

  const rental = await RentalServices.createRental(userId, bikeId, new Date(startTime));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental created successfully',
    data: rental,
  });
});

const returnBike = catchAsync(async (req: Request, res: Response) => {
  const { id: rentalId } = req.params;
  const userId = req.user.userId;

  const updatedRental = await RentalServices.returnBike(rentalId, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike returned successfully',
    data: updatedRental,
  });
});

const getAllRentalsForUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const rentals = await RentalServices.getAllRentalsForUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rentals retrieved successfully',
    data: rentals,
  });
});

export const RentalControllers = {
  createRental,
  returnBike,
  getAllRentalsForUser,
};
