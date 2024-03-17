import mongoose from 'mongoose';
import HTTP from 'http-status-codes';
import { CreateJobValidationSchemaType } from '../validation';
import { Application } from '../models/application.model';
import { AppError } from '../utils/app-error';
import { Job } from '../models/job.model';
import { FieldPicker } from '../utils/helper';
import { ApplicationFilterFields } from '../constants/application.constants';
import { ApplicationStatusType } from '../interfaces/application.interface';
import { UpdateApplicationStatusValidationType } from '../validation/application.validation';

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

async function UpdateApplicationStatus(
  payload: UpdateApplicationStatusValidationType,
) {
  const application = await Application.findById(payload.applicationId);
  if (!application) throw new AppError('No Application Found!', HTTP.NOT_FOUND);

  /* 
   * on_hold => inprogress => shortlisted
   * on_hold | inprogress => rejected
   ! shortlisted !=> rejected
   ! rejected !=> on_hold | inprogress | shortlisted
  */

  const updateRules: Record<ApplicationStatusType, ApplicationStatusType[]> = {
    on_hold: ['in_process', 'rejected'],
    in_process: ['shortlisted', 'rejected'],
    shortlisted: [],
    rejected: [],
  };

  const { status } = application.toObject();
  if (!updateRules[status].includes(payload.status as ApplicationStatusType))
    throw new AppError(
      `Updating Status ${payload.status} from ${status} is not allowed`,
      HTTP.BAD_REQUEST,
    );

  // updating status
  application.status = payload.status as ApplicationStatusType;
  await application.save();

  return application;
}

export const ApplicationServices = {
  CreateApplication,
  GetApplication,
  UpdateApplicationStatus,
};
