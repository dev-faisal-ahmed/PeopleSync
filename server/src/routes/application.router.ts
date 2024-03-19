import { Router } from 'express';
import { Validator } from '../middleware/validator';
import { ApplicationValidation } from '../validation/application.validation';
import { ApplicationController } from '../controller/application.controller';
import { AuthGuard } from '../middleware/auth-guard';

export const ApplicationRouter = Router();

ApplicationRouter.post(
  '/',
  Validator(ApplicationValidation.CreateApplicationValidationSchema),
  ApplicationController.CreateApplication,
);

ApplicationRouter.patch(
  '/',
  AuthGuard(),
  Validator(ApplicationValidation.UpdateApplicationStatusValidation),
  ApplicationController.UpdateApplicationStatus,
);

ApplicationRouter.get('/', AuthGuard(), ApplicationController.GetApplication);

ApplicationRouter.get(
  '/:jobId',
  AuthGuard(),
  ApplicationController.GetApplicationByJobId,
);
