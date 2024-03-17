import { Router } from 'express';
import { AuthGuard } from '../middleware/auth-guard';
import { Validator } from '../middleware/validator';
import { JobValidation } from '../validation';
import { JobController } from '../controller/job.controller';

export const JobRouter = Router();

JobRouter.post(
  '/',
  AuthGuard(),
  Validator(JobValidation.CreateJobValidationSchema),
  JobController.CreateJob,
);

JobRouter.get('/', JobController.GetJobs);
