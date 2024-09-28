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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const users_model_1 = require("./users.model");
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User.find();
    return result;
});
const getMe = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User.findById(userId);
    return result;
});
const updateProfile = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const changeUserRoleToAdmin = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    user.role = 'admin';
    yield user.save();
    return user;
});
const changeUserRoleToUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    user.role = 'user';
    yield user.save();
    return user;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User.findByIdAndDelete(id);
    // id,
    // { isDeleted: true },
    // {
    //   new: true,
    // }
    return result;
});
exports.UserServices = {
    getAllUser,
    getMe,
    updateProfile,
    deleteUser,
    changeUserRoleToAdmin,
    changeUserRoleToUser,
};
