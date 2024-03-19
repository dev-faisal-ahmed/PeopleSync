import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Provide an valid email' }),
  password: z.string({ required_error: 'Password is required' }).min(1),
});

export type LoginFromSchemaType = z.infer<typeof LoginFormSchema>;
