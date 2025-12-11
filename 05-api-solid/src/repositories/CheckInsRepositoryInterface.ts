import { CheckInUncheckedCreateInput } from '../../generated/prisma/models/CheckIn'
import { CheckIn } from '../../generated/prisma/client'

export default interface CheckInsRepositoryInterface {
  create(data: CheckInUncheckedCreateInput): Promise<CheckIn>
}
