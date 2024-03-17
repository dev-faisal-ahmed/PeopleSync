import {
  ApplicationStatusType,
  GenderType,
} from '../interfaces/application.interface';

export const ApplicationStatus: ApplicationStatusType[] = [
  'on_hold',
  'in_process',
  'shortlisted',
  'rejected',
];

export const ApplicantsGenders: GenderType[] = ['male', 'female'];

export const ApplicationFilterFields = {
  exactMatch: ['status', 'gender'],
};
