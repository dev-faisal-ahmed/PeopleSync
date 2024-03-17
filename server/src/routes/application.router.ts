import { Router } from 'express';
import { Validator } from '../middleware/validator';
import { ApplicationValidation } from '../validation/application.validation';
import { ApplicationController } from '../controller/application.controller';

export const ApplicationRouter = Router();

ApplicationRouter.post(
  '/',
  Validator(ApplicationValidation.CreateApplicationValidationSchema),
  ApplicationController.CreateApplication,
);
