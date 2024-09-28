"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const users_validation_1 = __importDefault(require("../users/users.validation"));
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(users_validation_1.default), auth_controller_1.AuthControllers.createUser);
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidations.LoginValidationSchema), auth_controller_1.AuthControllers.loginUser);
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.AuthValidations.refreshToeknValidationSchema), auth_controller_1.AuthControllers.refreshToekn);
exports.AuthRoute = router;
