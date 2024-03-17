import { Router } from 'express';
import { AuthRouter } from './auth.router';
import { JobRouter } from './job.router';
import { ApplicationRouter } from './application.router';

export const AppRouter = Router();

AppRouter.use('/auth', AuthRouter);
AppRouter.use('/job', JobRouter);
AppRouter.use('/application', ApplicationRouter);
