import { Schema, model } from 'mongoose';
import { ApplicationType } from '../interfaces/application.interface';
import { ApplicationStatus } from '../constants/application.constants';

export const ApplicationSchema = new Schema<ApplicationType>(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    job: { type: Schema.Types.ObjectId, ref: 'job', required: true },
    expectedSalary: { type: Number, required: true },
    experience: { type: Number },
    status: { type: String, enum: ApplicationStatus, default: 'ON_HOLD' },
  },
  { timestamps: true },
);

export const Application = model('application', ApplicationSchema);
