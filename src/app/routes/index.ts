import { Router } from "express";
// import { userRoutes } from "../modules/users/users.route";
import { bikeRoutes } from "../modules/bikes/bikes.route";
import { AuthRoute } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/users/users.route";
import { rentalRoutes } from "../modules/rental/rental.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/bikes",
    route: bikeRoutes,
  },
  {
    path: "/rentals",
    route: rentalRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
