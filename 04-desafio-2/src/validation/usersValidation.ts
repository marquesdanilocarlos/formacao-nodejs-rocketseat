import z from 'zod';

const usersSchema = z.object({
  name: z.string(),
  email: z.email(),
});

export default usersSchema;
