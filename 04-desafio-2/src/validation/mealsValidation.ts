import z from 'zod';

export const createSchema = z.object({
  name: z.string(),
  description: z.string(),
  is_diet: z.boolean(),
  user_id: z.uuid(),
});

export const showSchema = z.object({
  id: z.uuid(),
});
