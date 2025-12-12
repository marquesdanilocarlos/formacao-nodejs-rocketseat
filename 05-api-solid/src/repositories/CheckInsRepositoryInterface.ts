import { CheckInUncheckedCreateInput } from '../../generated/prisma/models/CheckIn'
import { CheckIn } from '../../generated/prisma/client'

export default interface CheckInsRepositoryInterface {
  create(data: CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
}
