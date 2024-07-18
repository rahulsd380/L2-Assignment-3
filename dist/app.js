"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandeler_1 = __importDefault(require("./app/middlewares/globalErrorHandeler"));
const notFoundHandeler_1 = __importDefault(require("./app/middlewares/notFoundHandeler"));
const app = (0, express_1.default)();
// Middleware for parsing JSON bodies
app.use(express_1.default.json());
// Middleware for handling CORS
app.use((0, cors_1.default)());
// Application routes
app.use('/api', routes_1.default);
// For catching the incorrect routes
app.use(notFoundHandeler_1.default);
// Error handling middleware
app.use(globalErrorHandeler_1.default);
app.use(notFound_1.default);
exports.default = app;
