import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated-e2e/prisma/client'
import { envSchema } from '@/validations/env.validator'

const connectionString = process.env.DATABASE_URL ?? envSchema.DATABASE_URL

const adapter = new PrismaPg({ connectionString })
export const prisma = new PrismaClient({
  adapter,
  log: ['error'],
})
