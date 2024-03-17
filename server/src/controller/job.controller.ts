import { JobServices } from '../services';
import { SendSuccessResponse } from '../utils/response-helper';
import { TryCatch } from '../utils/try-catch';

const CreateJob = TryCatch(async (req, res) => {
  const newJob = await JobServices.CreateJob(req.body);

  return SendSuccessResponse(res, {
    data: newJob,
    message: 'Job Created Successfully',
    status: 200,
  });
});

export const JobController = { CreateJob };
