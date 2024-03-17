import { z } from 'zod';
import { RequiredMsg } from '../utils/helper';

const CreateJobValidationSchema = z.object({
  job: z.string({ required_error: RequiredMsg('Job Id') }),
  title: z.string({ required_error: RequiredMsg('Title') }),
  description: z.string({ required_error: RequiredMsg('Description') }),
  salary: z.number({ required_error: RequiredMsg('Salary') }),
  vacancy: z.number({ required_error: RequiredMsg('Vacancy') }),
  skillsSet: z.string({ required_error: RequiredMsg('Skills Set') }).array(),
  experienceRequired: z.number().optional(),
});

export const JobValidation = {
  CreateJobValidationSchema,
};

export type CreateJobValidationSchemaType = z.infer<
  typeof CreateJobValidationSchema
>;
