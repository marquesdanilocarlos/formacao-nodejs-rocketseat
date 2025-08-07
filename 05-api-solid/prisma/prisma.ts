import { PrismaClient } from '@prisma/client'
import { env } from '@/validators/envValidator'

const prisma = new PrismaClient({
  log: env.NODE_ENV === 'development' ? ['query'] : [],
})

export default prisma
