import { Schema } from 'mongoose';

export type JobType = {
  _id: Schema.Types.ObjectId;
  title: string;
  description: string;
  skillsSet: string[];
  salary: number;
  vacancy: number;
  experienceRequired?: number;
  applications: Schema.Types.ObjectId[];
};
