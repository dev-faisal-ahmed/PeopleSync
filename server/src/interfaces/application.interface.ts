import { Schema } from 'mongoose';

export type ApplicationStatusType =
  | 'ON_HOLD'
  | 'IN_PROCESS'
  | 'SHORTLISTED'
  | 'REJECTED';

export type ApplicationType = {
  _id: Schema.Types.ObjectId;
  job: Schema.Types.ObjectId;
  name: string;
  imageUrl: string;
  experience?: number;
  expectedSalary: number;
  status: ApplicationStatusType;
};
