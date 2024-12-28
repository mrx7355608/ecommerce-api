import { z } from 'zod';

export const signupSchema = z
    .object({
        firstname: z
            .string()
            .min(5, 'Firstname cannot be shorter than 5 characters')
            .max(10, 'Firstname cannot be longer than 10 characters'),
        lastname: z
            .string()
            .min(5, 'Lastname cannot be shorter than 5 characters')
            .max(10, 'Lastname cannot be longer than 10 characters'),
        email: z.string().email('Invalid email'),
        password: z
            .string()
            .min(8, 'Password cannot be shorter than 8 characters')
            .max(20, 'Password cannot be longer than 20 characters'),
        confirm_password: z.string(),
    })
    .required()
    .refine((data) => data.password === data.confirm_password, {
        message: 'Passwords do not match',
        path: ['confirm_password'],
    });

export type SignupDTO = z.infer<typeof signupSchema>;
