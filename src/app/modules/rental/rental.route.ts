import express from 'express';
import auth from '../../middlewares/auth';
import { RentalControllers } from './rental.controller';
import { UserRole } from '../users/user.constant';

const router = express.Router();

router.post('/', auth('user', 'admin'), RentalControllers.createRental);
router.post('/:id/return', auth(UserRole.admin), RentalControllers.returnBike);
router.get('/', auth('user', 'admin'), RentalControllers.getAllRentalsForUser);

export const rentalRoutes = router;