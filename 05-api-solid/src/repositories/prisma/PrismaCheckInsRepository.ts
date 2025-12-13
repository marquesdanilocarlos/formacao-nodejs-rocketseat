import CheckInsRepositoryInterface from '@/repositories/CheckInsRepositoryInterface'
import { CheckInUncheckedCreateInput } from '../../../generated/prisma/models/CheckIn'
import prisma from '@/prisma'
import { CheckIn } from '../../../generated/prisma/client'
import dayjs from 'dayjs'

export default class PrismaCheckInsRepository implements CheckInsRepositoryInterface {
  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })

    return count
  }

  async create(data: CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })

    return checkIn
  }

  async findByUserOnDate(userId: string, date: Date) {
    const startOfDay = dayjs(date).startOf('date').toDate()
    const endOfDay = dayjs(date).endOf('date').toDate()

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    })

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return checkIns
  }

  async save(checkIn: CheckIn) {
    checkIn = await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    })

    return checkIn
  }
}
