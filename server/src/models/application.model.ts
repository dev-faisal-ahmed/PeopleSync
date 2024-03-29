import { Schema, model } from 'mongoose';
import { ApplicationType } from '../interfaces/application.interface';
import {
  ApplicantsGenders,
  ApplicationStatus,
} from '../constants/application.constants';

export const ApplicationSchema = new Schema<ApplicationType>(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    job: { type: Schema.Types.ObjectId, ref: 'job', required: true },
    expectedSalary: { type: Number, required: true },
    experience: { type: Number },
    status: { type: String, enum: ApplicationStatus, default: 'on_hold' },
    gender: { type: String, enum: ApplicantsGenders, required: true },
  },
  { timestamps: true },
);

export const Application = model('application', ApplicationSchema);
