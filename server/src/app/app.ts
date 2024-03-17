import express from 'express';
import cors from 'cors';
import { AppRouter } from '../routes';
import { GlobalErrorHandler } from '../middleware/global-error-handler';

export const app = express();

// middleware
app.use(express.json());
app.use(cors());

// main apis
app.use('/api/v1', AppRouter);

app.get('/', async (_, response) => {
  response.status(200).json({ message: 'Welcome to PeopleSyncServer' });
});

app.use(GlobalErrorHandler);
