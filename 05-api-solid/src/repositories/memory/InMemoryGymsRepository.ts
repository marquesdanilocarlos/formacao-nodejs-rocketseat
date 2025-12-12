import GymsRepositoryInterface from '@/repositories/GymsRepositoryInterface'

import { GymCreateInput } from '../../../generated/prisma/models/Gym'
import { Gym } from '../../../generated/prisma/client'
import { Decimal } from '@prisma/client/runtime/client'

export class InMemoryGymsRepository implements GymsRepositoryInterface {
  public itens: Gym[] = []

  async create(data: GymCreateInput) {
    const gym: Gym = {
      id: data.id ?? crypto.randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude:
        data.latitude instanceof Decimal
          ? data.latitude
          : Decimal(data.latitude.toString()),
      longitude:
        data.longitude instanceof Decimal
          ? data.longitude
          : Decimal(data.longitude.toString()),
    }

    this.itens.push(gym)

    return gym
  }

  async findById(id: string) {
    const gym = this.itens.find((item) => item.id === id)

    return gym || null
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = this.itens.filter((item) => item.title.includes(query))
    return gyms.slice((page - 1) * 20, page * 20)
  }
}
