import { z } from 'zod';
import { RequiredMsg } from '../utils/helper';
import { ApplicantsGenders } from '../constants/application.constants';

const CreateApplicationValidationSchema = z.object({
  job: z.string({ required_error: RequiredMsg('Job Id') }),
  name: z.string({ required_error: RequiredMsg('Name') }),
  imageUrl: z.string({ required_error: RequiredMsg('ImageUrl') }),
  experience: z.number({}).optional(),
  expectedSalary: z.number({ required_error: RequiredMsg('Expected Salary') }),
  gender: z.enum([...(ApplicantsGenders as [string, ...string[]])]),
});

export const ApplicationValidation = { CreateApplicationValidationSchema };

export type CreateApplicationValidationSchemaType = z.infer<
  typeof CreateApplicationValidationSchema
>;
