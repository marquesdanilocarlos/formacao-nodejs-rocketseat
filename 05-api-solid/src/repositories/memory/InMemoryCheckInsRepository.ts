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
}
