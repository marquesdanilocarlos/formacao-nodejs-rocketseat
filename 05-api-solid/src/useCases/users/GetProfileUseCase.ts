import UsersRepositoryInterface from '@/repositories/UsersRepositoryInterface'
import { User } from '../../../generated/prisma/client'
import ResourceNotFoundError from '@/errors/ResourceNotFoundError'

interface GetProfileUseCaseRequest {
  userId: string
}

interface GetProfileUseCaseResponse {
  user: User
}

export default class GetProfileUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    userId,
  }: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
