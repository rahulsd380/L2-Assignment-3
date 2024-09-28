"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponCodeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const couponCode_validation_1 = __importDefault(require("./couponCode.validation"));
const couponCode_controller_1 = require("./couponCode.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(auth_constannts_1.UserRole.admin), (0, validateRequest_1.default)(couponCode_validation_1.default), couponCode_controller_1.CouponCodeControllers.createCouponCode);
router.get('/', couponCode_controller_1.CouponCodeControllers.getAllCouponCodes);
router.delete('/deleteCoupon/:couponId', couponCode_controller_1.CouponCodeControllers.deleteCouponCode);
router.post('/validateCoupon', couponCode_controller_1.CouponCodeControllers.validateCouponCode);
exports.couponCodeRoutes = router;
