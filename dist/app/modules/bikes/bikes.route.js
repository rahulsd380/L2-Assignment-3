"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const bikes_controller_1 = require("../bikes/bikes.controller");
const bikes_validation_1 = __importDefault(require("./bikes.validation"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(auth_constannts_1.UserRole.admin), (0, validateRequest_1.default)(bikes_validation_1.default), bikes_controller_1.BikeControllers.createBike);
router.get('/', bikes_controller_1.BikeControllers.getAllBikes);
router.put('/:id', (0, auth_1.default)(auth_constannts_1.UserRole.admin), bikes_controller_1.BikeControllers.updateBike);
router.delete('/:id', (0, auth_1.default)(auth_constannts_1.UserRole.admin), bikes_controller_1.BikeControllers.deleteBike);
router.get('/:bikeId', bikes_controller_1.BikeControllers.getSingleBikeById);
exports.bikeRoutes = router;
