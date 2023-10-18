import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters long'),
    email: z.string().trim().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.string().trim().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export const timeTrackSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  start: z.coerce.date(),
  end: z.coerce.date(),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
export type TimeTrackSchemaType = z.infer<typeof timeTrackSchema>;
