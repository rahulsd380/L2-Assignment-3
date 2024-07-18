"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
// users.route.ts
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get('/', users_controller_1.UserControllers.getAllUser);
router.get('/me', (0, auth_1.default)('user', 'admin'), users_controller_1.UserControllers.getMe);
router.patch('/me', (0, auth_1.default)('user', 'admin'), users_controller_1.UserControllers.updateProfile);
exports.userRoutes = router;
