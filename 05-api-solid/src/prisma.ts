import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'
import { env } from '@/validations/env'

const connectionString = env.DATABASE_URL
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === 'development' ? ['query'] : ['error'],
})

export default prisma
