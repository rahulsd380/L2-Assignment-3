
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
  console.log(result);

  if(result.length === 0 || result.length === undefined){
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: false,
      message: "No data found.",
      data: result,
    });
  }


  
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

const deleteBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BikeServices.deleteBike(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike deleted successfully",
    data: result,
  });
});

export const BikeControllers = {
  createBike,
  getAllBikes,
  updateBike,
  deleteBike,
};
