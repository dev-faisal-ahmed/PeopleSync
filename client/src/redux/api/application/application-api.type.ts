import { ApplicationStatusType } from '@/utils/types/application.type';

export type CreateApplicationRequestType = {
  name: string;
  imageUrl: string;
  job: string;
  expectedSalary: number;
  experience: number;
  gender: 'male' | 'female';
};

export type UpdateApplicationStatusRequestType = {
  applicationId: string;
  status: ApplicationStatusType;
};
