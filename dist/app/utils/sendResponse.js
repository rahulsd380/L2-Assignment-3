"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    var _a;
    console.log(data);
    res.status((_a = data.statusCode) !== null && _a !== void 0 ? _a : 200).json({
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
        token: data.token,
        data: data.data,
    });
};
exports.default = sendResponse;
