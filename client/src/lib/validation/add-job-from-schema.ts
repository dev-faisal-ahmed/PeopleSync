import { z } from 'zod';

export const AddJobFormSchema = z.object({
  title: z.string({ required_error: 'Title is required' }).min(2),
  description: z.string({ required_error: 'Description is required' }).min(2),
  salary: z.string({ required_error: 'Salary is required' }).min(2),
  vacancy: z.string({ required_error: 'Vacancy is required' }).min(1),
  experienceRequired: z.string().optional(),
});

export type AddJobFormSchemaType = z.infer<typeof AddJobFormSchema>;
