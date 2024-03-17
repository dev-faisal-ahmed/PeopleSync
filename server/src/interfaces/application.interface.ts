import { Schema } from 'mongoose';

export type ApplicationStatusType =
  | 'on_hold'
  | 'in_process'
  | 'shortlisted'
  | 'rejected';

export type GenderType = 'male' | 'female';

export type ApplicationType = {
  _id: Schema.Types.ObjectId;
  job: Schema.Types.ObjectId;
  name: string;
  imageUrl: string;
  experience?: number;
  expectedSalary: number;
  status: ApplicationStatusType;
  gender: GenderType;
};
