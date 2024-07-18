// users.route.ts
import express from 'express';
import { UserControllers } from './users.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', UserControllers.getAllUser);
router.get('/me', auth('user', 'admin'), UserControllers.getMe);
router.patch('/me', auth('user', 'admin'), UserControllers.updateProfile);

export const userRoutes = router;
