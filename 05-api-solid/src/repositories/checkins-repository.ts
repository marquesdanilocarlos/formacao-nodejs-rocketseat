import { CheckInUncheckedCreateInput } from '../../generated/prisma/models/CheckIn'
import { CheckIn } from '../../generated/prisma/client'

export default interface CheckinsRepository {
  create(data: CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
  findById(id: string): Promise<CheckIn | null>
  save(checkIn: CheckIn): Promise<CheckIn>
}
