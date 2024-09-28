"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const rental_controller_1 = require("./rental.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('user', 'admin'), rental_controller_1.RentalControllers.createRental);
router.post('/:id/return', rental_controller_1.RentalControllers.returnBike); //auth(UserRole.admin)
router.get('/', (0, auth_1.default)('user', 'admin'), rental_controller_1.RentalControllers.getAllRentalsForUser);
router.get('/all-rentals', rental_controller_1.RentalControllers.getAllRentals);
// auth('admin')
exports.rentalRoutes = router;
