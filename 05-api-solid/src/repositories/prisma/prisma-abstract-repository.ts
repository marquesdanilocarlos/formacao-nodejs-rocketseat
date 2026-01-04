import prisma from '@/prisma'
import { prisma as prismaE2e } from '@/prisma-e2e'
import { envSchema } from '@/validations/env.validator'

export default class PrismaAbstractRepository {
  protected prisma

  constructor() {
    this.prisma = envSchema.NODE_ENV === 'test' ? prismaE2e : prisma
  }
}
