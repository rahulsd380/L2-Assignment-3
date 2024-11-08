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
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        // Check if the auth header is present
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized to proceed!');
        }
        // Extract the token by removing 'Bearer ' from the auth header
        const token = authHeader.split(' ')[1];
        // Verify the token
        jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret, (err, decoded) => {
            if (err) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You have no access to this route');
            }
            const role = decoded.role;
            // Check if user has required role(s)
            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You have no access to this route');
            }
            // Attach the decoded token to the request
            req.user = decoded;
            next();
        });
    }));
};
exports.default = auth;
