import mongoose from 'mongoose';
import HTTP from 'http-status-codes';
import { CreateJobValidationSchemaType } from '../validation';
import { Application } from '../models/application.model';
import { AppError } from '../utils/app-error';
import { Job } from '../models/job.model';
import { FieldPicker } from '../utils/helper';
import { ApplicationFilterFields } from '../constants/application.constants';

async function CreateApplication(payload: CreateJobValidationSchemaType) {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const { job } = payload;
    //  first create a application
    const [newApplication] = await Application.create([payload], { session });

    // if application is not created rollback
    if (!newApplication)
      throw new AppError('Failed to apply for the job ', HTTP.BAD_REQUEST);

    // now adding the applicationId to the Jobs Applications
    const updatedStatus = await Job.findByIdAndUpdate(
      job,
      { $push: { applications: newApplication._id } },
      { session },
    );

    if (!updatedStatus)
      throw new AppError(
        'Failed to insert applicationId to the job table',
        HTTP.BAD_REQUEST,
      );

    await session.commitTransaction();
    return newApplication;
  } catch (err) {
    await session.abortTransaction();

    if (err instanceof AppError) throw new AppError(err.message, err.status);
    throw new AppError(err.message, HTTP.BAD_REQUEST);
  } finally {
    await session.endSession();
  }
}

async function GetApplication(query: Record<string, string>) {
  const findQuery: Record<string, any> = {};

  // to find by id
  if (query._id) {
    findQuery._id = query._id;
  }

  // to search by user's name
  if (query.name) {
    findQuery.name = { $regex: query.name, $options: 'i' };
  }

  // for the which needs to be  matched exactly
  const exactMath = FieldPicker(query, ApplicationFilterFields.exactMatch);
  if (Object.keys(exactMath).length) {
    Object.keys(exactMath).forEach((key) => {
      findQuery[key] = exactMath[key].toLowerCase();
    });
  }

  // for pagination
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 5;

  const applications = await Application.find(findQuery)
    .sort({
      createdAt: -1,
    })
    .skip((page - 1) * limit)
    .limit(limit);
  return applications;
}

export const ApplicationServices = { CreateApplication, GetApplication };
