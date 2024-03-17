import { Router } from 'express';
import { Validator } from '../middleware/validator';
import { LoginValidationSchema } from '../validation';
import { AuthController } from '../controller';

export const AuthRouter = Router();

AuthRouter.post(
  '/login',
  Validator(LoginValidationSchema),
  AuthController.Login,
);
