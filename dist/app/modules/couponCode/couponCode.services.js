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
exports.CouponCodeServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const users_model_1 = require("../users/users.model");
const couponCode_model_1 = require("./couponCode.model");
const createCouponCode = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isAdmin = yield users_model_1.User.findOne({ role: 'admin' });
    if (!isAdmin) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Only admin can create coupon code!");
    }
    const result = yield couponCode_model_1.CouponCode.create(payload);
    return result;
});
const validateCouponCode = (couponCode) => __awaiter(void 0, void 0, void 0, function* () {
    const coupon = yield couponCode_model_1.CouponCode.findOne({ couponCode });
    if (!coupon) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid or expired coupon code!");
    }
    // Check if the coupon has expired
    // const currentDate = new Date();
    // if (coupon.expiryDate && currentDate > coupon.expiryDate) {
    //   throw new AppError(httpStatus.BAD_REQUEST, "Coupon code has expired!");
    // }
    // Check if usage limit is applicable
    // if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    //   throw new AppError(httpStatus.BAD_REQUEST, "Coupon usage limit exceeded!");
    // }
    return {
        off: coupon.off,
    };
});
const getAllCouponCodes = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield couponCode_model_1.CouponCode.find();
    return result;
});
const deleteCouponCode = (couponId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield couponCode_model_1.CouponCode.findByIdAndDelete(couponId);
    return result;
});
exports.CouponCodeServices = {
    createCouponCode,
    getAllCouponCodes,
    deleteCouponCode,
    validateCouponCode
};
