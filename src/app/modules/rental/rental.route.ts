import express from 'express';
import auth from '../../middlewares/auth';
import { RentalControllers } from './rental.controller';

const router = express.Router();

router.post('/', auth('user', 'admin'), RentalControllers.createRental);
router.post('/:id/return', auth('user', 'admin'), RentalControllers.returnBike);
router.get('/', auth('user', 'admin'), RentalControllers.getAllRentalsForUser);

export const rentalRoutes = router;