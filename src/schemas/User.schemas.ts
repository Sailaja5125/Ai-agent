import { z } from 'zod';

export const passwordValidation = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .max(32, { message: 'Password must not exceed 32 characters' })
  .regex(/[A-Z]/, { message: 'Password must include at least one uppercase letter' })
  .regex(/[a-z]/, { message: 'Password must include at least one lowercase letter' })
  .regex(/[0-9]/, { message: 'Password must include at least one number' })
  .regex(/[^A-Za-z0-9]/, { message: 'Password must include at least one special character (e.g., !@#$%^&*)' })
  .refine(password => !/(1234|password|abcd)/i.test(password), {
    message: 'Password is too weak or contains common patterns',
  });

export const UserSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: passwordValidation,
});