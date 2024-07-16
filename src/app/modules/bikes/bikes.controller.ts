
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { BikeServices } from './bikes.services';

const createBike = catchAsync(async (req, res) => {
  
  const result = await BikeServices.createBike(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike added successfully',
    data: result,
  });
});

const getAllBikes = catchAsync(async (req, res) => {
  console.log(req.user);
  const result = await BikeServices.getAllBikes();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bikes retrieved successfully',
    data: result,
  });
})

const updateBike= catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await BikeServices.updateBike(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike updated successfully",
    data: result,
  });
});

export const BikeControllers = {
  createBike,
  getAllBikes,
  updateBike
};
