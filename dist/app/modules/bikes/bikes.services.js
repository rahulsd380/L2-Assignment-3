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
exports.BikeServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const users_model_1 = require("../users/users.model");
const bikes_model_1 = require("./bikes.model");
const createBike = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, image, description, pricePerHour, cc, year, model, brand } = payload;
    const payloadData = {
        name: name || "",
        image: image || "",
        description: description || "",
        pricePerHour: pricePerHour || "",
        isAvailable: true,
        cc: cc || "",
        year: year || "",
        model: model || "",
        brand: brand || "",
    };
    const isAdmin = yield users_model_1.User.findOne({ role: 'admin' });
    if (!isAdmin) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Only admin can create bike!");
    }
    ;
    const result = yield bikes_model_1.Bike.create(payloadData);
    return result;
});
const getAllBikes = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bikes_model_1.Bike.find();
    return result;
});
const getSingleBikeById = (bikeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bikes_model_1.Bike.findById(bikeId);
    return result;
});
const updateBike = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bikes_model_1.Bike.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteBike = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bikes_model_1.Bike.findByIdAndDelete(id);
    return result;
});
exports.BikeServices = {
    createBike,
    getAllBikes,
    updateBike,
    deleteBike,
    getSingleBikeById,
};
