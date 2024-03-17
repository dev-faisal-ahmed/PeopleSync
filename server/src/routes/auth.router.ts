import { Router } from 'express';
import { Validator } from '../middleware/validator';

import { AuthController } from '../controller';
import { AuthValidation } from '../validation';

export const AuthRouter = Router();

AuthRouter.post(
  '/login',
  Validator(AuthValidation.LoginValidationSchema),
  AuthController.Login,
);
