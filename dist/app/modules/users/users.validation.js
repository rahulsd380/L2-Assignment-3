"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string"
        }).min(1, { message: "Name cannot be empty" }),
        email: zod_1.z.string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string"
        }).email({ message: "Invalid email address" }),
        password: zod_1.z.string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string"
        }).min(6, { message: "Password must be at least 6 characters long" }),
        phone: zod_1.z.string({
            required_error: "Phone is required"
        }),
        address: zod_1.z.string({
            required_error: "Address is required",
            invalid_type_error: "Address must be a string"
        }),
    })
});
exports.default = userValidation;
