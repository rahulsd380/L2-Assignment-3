"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const couponCodeValidation = zod_1.z.object({
    body: zod_1.z.object({
        couponCode: zod_1.z.string({
            required_error: "Coupon code is required",
            invalid_type_error: "Coupon code must be a string",
        }),
        off: zod_1.z.number({
            required_error: "% is required",
        })
    })
});
exports.default = couponCodeValidation;
