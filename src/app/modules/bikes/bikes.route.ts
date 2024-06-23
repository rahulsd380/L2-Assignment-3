import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BikeControllers } from '../bikes/bikes.controller';
import bikeValidation from './bikes.validation';

const router = express.Router();

router.post('/', validateRequest(bikeValidation), BikeControllers.createBike);
router.get('/', BikeControllers.getAllBikes);

export const bikeRoutes = router;