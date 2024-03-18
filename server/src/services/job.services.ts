import { JobFilterFields } from '../constants/job.constants';
import { Job } from '../models/job.model';
import { ConvertToLowerCase, FieldPicker } from '../utils/helper';
import { CreateJobValidationSchemaType } from '../validation';

async function CreateJob(payload: CreateJobValidationSchemaType) {
  // converting the skillsSets into an lowerCase
  const newJob = await Job.create({
    ...payload,
    skillsSet: ConvertToLowerCase(payload.skillsSet),
  });
  return newJob;
}

async function GetJobs(query: Record<string, string>) {
  const findQuery: Record<string, any> = {};

  if (query._id) {
    findQuery._id = query._id;
  }

  const partialMatch = FieldPicker(query, JobFilterFields.partialMatch);
  // partial match
  const orOperation = [];
  Object.keys(partialMatch).forEach((key) => {
    orOperation.push({ [key]: { $regex: partialMatch[key], $options: 'i' } });
  });

  // partial match for skillsSet
  if (query.skillsSet) {
    const lists = query.skillsSet.toLowerCase().split(',');
    orOperation.push({ skillsSet: { $in: lists } });
  }

  if (orOperation.length) findQuery['$or'] = orOperation;

  // minMax Salary
  const salary: Record<string, any> = {};
  if (query.minSalary) {
    salary['$gte'] = Number(query.minSalary);
  }
  if (query.maxSalary) {
    salary['$lte'] = Number(query.maxSalary);
  }

  // only include when salary has any property
  if (Object.keys(salary).length) {
    findQuery.salary = salary;
  }

  // minMax Experience
  const experienceRequired: Record<string, any> = {};
  if (query.minExperience) {
    experienceRequired['$gte'] = Number(query.minExperience);
  }
  if (query.maxExperience) {
    experienceRequired['$lte'] = Number(query.maxExperience);
  }

  if (Object.keys(experienceRequired).length) {
    findQuery.experienceRequired = experienceRequired;
  }

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 5;

  // to avoid sorting for unwanted fields
  const sortBy = JobFilterFields.sortBaleFields.includes(query.sortBy)
    ? query.sortBy
    : 'createdAt';
  const sortOrder = query.sortOrder === 'asc' ? 1 : -1;

  const jobs = await Job.find(findQuery)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * limit)
    .limit(limit);

  return jobs;
}

export const JobServices = {
  CreateJob,
  GetJobs,
};
