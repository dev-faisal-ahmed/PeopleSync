import { Job } from '../../models/job.model';
import { CreateJobValidationSchemaType } from '../../validation';

export async function CreateJob(payload: CreateJobValidationSchemaType) {
  const newJob = await Job.create(payload);
  return newJob;
}
