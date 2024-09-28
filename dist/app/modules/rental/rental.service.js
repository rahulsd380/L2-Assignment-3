"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const bikes_model_1 = require("../bikes/bikes.model");
const rental_model_1 = require("./rental.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createRental = (userId, bikeId, startTime) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(bikeId)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid bike ID');
    }
    const bike = yield bikes_model_1.Bike.findById(bikeId);
    console.log(bike === null || bike === void 0 ? void 0 : bike.isAvailable);
    if (!bike) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Bike not found');
    }
    if (!bike.isAvailable) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Bike is not available');
    }
    bike.isAvailable = false;
    yield bike.save();
    // Create rental
    const rental = yield rental_model_1.Rental.create({
        userId,
        bikeId,
        startTime,
        returnTime: null,
        totalCost: 0,
        isReturned: false,
    });
    return rental;
});
const returnBike = (rentalId) => __awaiter(void 0, void 0, void 0, function* () {
    const rental = yield rental_model_1.Rental.findById(rentalId);
    if (!rental) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Rental not found');
    }
    const bike = yield bikes_model_1.Bike.findById(rental.bikeId);
    if (!bike) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Bike not found');
    }
    const returnTime = new Date();
    const rentalDurationInHours = (returnTime.getTime() - rental.startTime.getTime()) / (1000 * 60 * 60);
    // Ensure bike.pricePerHour is a number, you can either cast it or handle a fallback
    const pricePerHour = Number(bike.pricePerHour);
    if (isNaN(pricePerHour)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid bike price per hour');
    }
    const totalCost = rentalDurationInHours * pricePerHour;
    rental.returnTime = returnTime;
    rental.totalCost = totalCost;
    rental.isReturned = true;
    yield rental.save();
    bike.isAvailable = true;
    yield bike.save();
    return rental;
});
const getAllRentals = () => __awaiter(void 0, void 0, void 0, function* () {
    const rentals = yield rental_model_1.Rental.find();
    return rentals;
});
const getAllRentalsForUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const rentals = yield rental_model_1.Rental.find({ userId });
    return rentals;
});
exports.RentalServices = {
    createRental,
    returnBike,
    getAllRentalsForUser,
    getAllRentals
};
