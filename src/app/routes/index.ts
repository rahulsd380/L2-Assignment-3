import { Router } from "express";
// import { userRoutes } from "../modules/users/users.route";
import { bikeRoutes } from "../modules/bikes/bikes.route";
import { AuthRoute } from "../modules/auth/auth.route";

const router = Router();

const moduleRoutes = [
  // {
  //   path: "/auth",
  //   route: userRoutes,
  // },
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/bikes",
    route: bikeRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
