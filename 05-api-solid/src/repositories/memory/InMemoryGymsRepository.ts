import GymsRepositoryInterface from '@/repositories/GymsRepositoryInterface'

import { GymCreateInput } from '../../../generated/prisma/models/Gym'
import { Gym } from '../../../generated/prisma/client'
import { Decimal } from '@prisma/client/runtime/client'

export class InMemoryGymsRepository implements GymsRepositoryInterface {
  public itens: Gym[] = []

  async create(data: GymCreateInput) {
    const gym: Gym = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude:
        data.latitude instanceof Decimal
          ? data.latitude
          : Decimal(
              // @ts-expect-error - Converte para decimal
              data.latitude,
            ),
      longitude:
        data.longitude instanceof Decimal
          ? data.longitude
          : Decimal(
              // @ts-expect-error - Converte para decimal
              data.longitude,
            ),
    }

    this.itens.push(gym)

    return gym
  }

  async findById(id: string) {
    const gym = this.itens.find((item) => item.id === id)

    return gym || null
  }
}
