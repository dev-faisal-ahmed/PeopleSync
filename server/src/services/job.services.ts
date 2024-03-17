import { Job } from '../models/job.model';
import { CreateJobValidationSchemaType } from '../validation';

async function CreateJob(payload: CreateJobValidationSchemaType) {
  const newJob = await Job.create(payload);
  return newJob;
}

async function GetJobs() {}

export const JobServices = {
  CreateJob,
};
