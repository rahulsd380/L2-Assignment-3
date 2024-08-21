"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const rental_controller_1 = require("./rental.controller");
const user_constant_1 = require("../users/user.constant");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('user', 'admin'), rental_controller_1.RentalControllers.createRental);
router.post('/:id/return', (0, auth_1.default)(user_constant_1.UserRole.admin), rental_controller_1.RentalControllers.returnBike);
router.get('/', (0, auth_1.default)('user', 'admin'), rental_controller_1.RentalControllers.getAllRentalsForUser);
exports.rentalRoutes = router;
