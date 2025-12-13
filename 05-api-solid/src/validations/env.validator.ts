import { z } from 'zod'
import 'dotenv/config'

const envValidator = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
})

const _env = envValidator.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid enviroment variables', _env.error.format())
  throw new Error('Invalid enviroment variables')
}

export const envSchema = _env.data
