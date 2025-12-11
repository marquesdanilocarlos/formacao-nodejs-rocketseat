import { CheckIn } from '../../../generated/prisma/client'
import CheckInsRepositoryInterface from '@/repositories/CheckInsRepositoryInterface'
import { CheckInUncheckedCreateInput } from '../../../generated/prisma/models/CheckIn'
import { randomUUID } from 'node:crypto'

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
}
