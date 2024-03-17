import {
  ApplicationStatusType,
  GenderType,
} from '../interfaces/application.interface';

export const ApplicationStatus: ApplicationStatusType[] = [
  'ON_HOLD',
  'IN_PROCESS',
  'SHORTLISTED',
  'REJECTED',
];

export const ApplicantsGenders: GenderType[] = ['male', 'female'];
