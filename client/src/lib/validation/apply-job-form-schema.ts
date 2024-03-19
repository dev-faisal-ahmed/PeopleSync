import { z } from 'zod';

export const ApplyJobFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  expectedSalary: z.string().min(1, { message: 'Salary is required' }),
  experience: z.string().min(1, { message: 'Experience is required' }),
});

export type ApplyJobFormSchemaType = z.infer<typeof ApplyJobFormSchema>;
