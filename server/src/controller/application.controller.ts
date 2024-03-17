import { ApplicationServices } from '../services/application.services';
import { SendSuccessResponse } from '../utils/response-helper';
import { TryCatch } from '../utils/try-catch';

const CreateApplication = TryCatch(async (req, res) => {
  const newApplication = await ApplicationServices.CreateApplication(req.body);

  return SendSuccessResponse(res, {
    data: newApplication,
    message: 'Your application was successful',
    status: 200,
  });
});

export const ApplicationController = { CreateApplication };
