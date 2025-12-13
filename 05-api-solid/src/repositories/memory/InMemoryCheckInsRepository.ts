import { CheckIn } from '../../../generated/prisma/client'
import CheckInsRepositoryInterface from '@/repositories/CheckInsRepositoryInterface'
import { CheckInUncheckedCreateInput } from '../../../generated/prisma/models/CheckIn'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

export default class InMemoryCheckInsRepository implements CheckInsRepositoryInterface {
  public itens: CheckIn[] = []

  async create(data: CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      isValidated: data.isValidated ? new Date() : null,
      createdAt: new Date(),
    }

    this.itens.push(checkIn)

    return checkIn
  }

  async findByUserOnDate(userId: string, date: Date) {
    dayjs.extend(isBetween)
    const newCheckInDate = dayjs(date).format('YYYY-MM-DD')

    const checkInOnSameDate = this.itens.find(function (checkIn) {
      const checkInDate = dayjs(checkIn.createdAt).format('YYYY-MM-DD')
      const isOnSameDate = newCheckInDate === checkInDate
      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkIns = this.itens.filter((item) => item.user_id === userId)

    return checkIns.slice((page - 1) * 20, page * 20)
  }

  async countByUserId(userId: string): Promise<number> {
    return this.itens.filter((item) => item.user_id === userId).length
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.itens.find((item) => item.id === id)
    return checkIn ?? null
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.itens.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.itens[checkInIndex] = checkIn
    }
    return checkIn
  }
}
