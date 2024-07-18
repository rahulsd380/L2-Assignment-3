"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { userRoutes } from "../modules/users/users.route";
const bikes_route_1 = require("../modules/bikes/bikes.route");
const auth_route_1 = require("../modules/auth/auth.route");
const users_route_1 = require("../modules/users/users.route");
const rental_route_1 = require("../modules/rental/rental.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/users",
        route: users_route_1.userRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoute,
    },
    {
        path: "/bikes",
        route: bikes_route_1.bikeRoutes,
    },
    {
        path: "/rentals",
        route: rental_route_1.rentalRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
