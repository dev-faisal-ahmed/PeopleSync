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

const GetApplication = TryCatch(async (req, res) => {
  const applications = await ApplicationServices.GetApplication(
    req.query as Record<string, string>,
  );

  return SendSuccessResponse(res, {
    data: applications,
    message: 'Application Retrieved',
    status: 200,
  });
});

const UpdateApplicationStatus = TryCatch(async (req, res) => {
  const updatedApplication = await ApplicationServices.UpdateApplicationStatus(
    req.body,
  );

  return SendSuccessResponse(res, {
    data: updatedApplication,
    message: 'Application Updated',
    status: 200,
  });
});

export const ApplicationController = {
  CreateApplication,
  GetApplication,
  UpdateApplicationStatus,
};
