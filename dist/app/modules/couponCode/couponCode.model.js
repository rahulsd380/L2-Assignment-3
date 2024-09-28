"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponCode = void 0;
const mongoose_1 = require("mongoose");
const couponCodeSchema = new mongoose_1.Schema({
    couponCode: {
        type: String,
        required: [true, "Coupon code is required"],
    },
    off: {
        type: Number,
        required: [true, "% is required"],
    }
}, {
    timestamps: true,
});
exports.CouponCode = (0, mongoose_1.model)("CouponCode", couponCodeSchema);
