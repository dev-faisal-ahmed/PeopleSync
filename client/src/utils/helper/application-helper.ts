import {
  ApplicationStatusType,
  ApplicationType,
} from '../types/application.type';

export function filterApplicationByStatus(
  applications: ApplicationType[],
  status: ApplicationStatusType,
) {
  return applications.filter((application) => application.status === status);
}
