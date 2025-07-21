import z from 'zod';

export const createSchema = z.object({
  name: z.string(),
  email: z.email(),
});

export const loginSchema = z.object({
  email: z.email(),
});
