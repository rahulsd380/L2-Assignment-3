import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BikeControllers } from '../bikes/bikes.controller';
import bikeValidation from './bikes.validation';
import auth from '../../middlewares/auth';
import { UserRole } from '../users/user.constant';

const router = express.Router();

router.post('/', auth(UserRole.admin), validateRequest(bikeValidation), BikeControllers.createBike);
router.get('/', BikeControllers.getAllBikes);
router.put('/:id', BikeControllers.updateBike);

export const bikeRoutes = router;