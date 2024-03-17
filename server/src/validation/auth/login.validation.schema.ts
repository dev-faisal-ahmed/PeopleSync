import { z } from 'zod';

export const LoginValidationSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Provide a valid email' }),

  password: z.string({ required_error: 'Password is required' }),
});

export type LoginValidationSchemaType = z.infer<typeof LoginValidationSchema>;
