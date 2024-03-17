import { Router } from 'express';
import { AuthRouter } from './auth.router';

export const AppRouter = Router();

AppRouter.use('/auth', AuthRouter);
