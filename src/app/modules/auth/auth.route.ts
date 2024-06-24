import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';
import { AuthControllers } from './auth.controller';
const router = express.Router();

router.post('/login', validateRequest(AuthValidations.LoginValidationSchema), AuthControllers.loginUser);

export const AuthRoute = router;