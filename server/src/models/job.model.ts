import { Schema, model } from 'mongoose';
import { JobType } from '../interfaces/job.interface';

export const JobSchema = new Schema<JobType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: Number, required: true },
    experienceRequired: { type: Number },
    vacancy: { type: Number, required: true },
    skillsSet: [{ type: String, required: true }],
    applications: [{ type: Schema.Types.ObjectId, default: [] }],
  },
  { timestamps: true },
);

export const Job = model('job', JobSchema);
