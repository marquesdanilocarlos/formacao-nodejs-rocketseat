import { z } from 'zod'

export const registerBodySchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
})

export const authenticateBodySchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})
