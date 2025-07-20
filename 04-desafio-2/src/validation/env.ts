import z from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  DB_CLIENT: z.enum(['sqlite', 'pg']).default('sqlite'),
  DB_URL: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
