import express from 'express';
import { UserControllers } from './users.controller';
import validateRequest from '../../middlewares/validateRequest';
import userValidation from './users.validation';

const router = express.Router();

router.post('/signup', validateRequest(userValidation), UserControllers.createUser);
router.get('/', UserControllers.getAllUSer);

export const userRoutes = router;