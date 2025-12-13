import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'
import { envSchema } from '@/validations/env.validator'

const connectionString = envSchema.DATABASE_URL
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({
  adapter,
  log: envSchema.NODE_ENV === 'development' ? ['query'] : ['error'],
})

export default prisma
