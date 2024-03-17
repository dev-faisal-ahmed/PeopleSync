import { z } from 'zod';
import { RequiredMsg } from '../utils/helper';

const LoginValidationSchema = z.object({
  email: z
    .string({ required_error: RequiredMsg('Email') })
    .email({ message: 'Provide a valid email' }),
  password: z.string({ required_error: RequiredMsg('Password') }),
});

export const AuthValidation = {
  LoginValidationSchema,
};

export type LoginValidationSchemaType = z.infer<typeof LoginValidationSchema>;
