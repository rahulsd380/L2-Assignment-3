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
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const users_model_1 = require("../users/users.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
// Create user route
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const isUserExists = yield users_model_1.User.findOne({ email: payload.email });
    if (isUserExists) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "User already exists.");
    }
    const result = yield users_model_1.User.create(payload);
    return result;
});
// Login
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the user exists or not
    const user = yield users_model_1.User.isUserExists(payload.email);
    if (!(yield user)) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User does not exists.");
    }
    // Check if the user already deleted or not
    // const isUserDeleted = isUserexists?.isDeleted;
    // console.log(isUserDeleted);
    // if(isUserDeleted){
    //     throw new AppError(httpStatus.NOT_FOUND, 'This user is deleted form DB!')
    // }
    // Check if the password is correct or not
    if (!(yield users_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password is not correct.");
    }
    // Create token and send to client/user
    const jwtPayload = {
        userId: user._id.toString(),
        userEmail: user.email,
        role: user.role,
    };
    console.log(jwtPayload);
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: "20d",
    });
    // Access the user into his account.
    return {
        accessToken,
    };
});
exports.AuthServices = {
    createUser,
    loginUser,
};
