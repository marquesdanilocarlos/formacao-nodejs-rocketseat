import UsersRepositoryInterface from '@/repositories/UsersRepositoryInterface'
import InvalidCredentialsError from '@/errors/InvalidCredentialsError'
import { User } from '../../../generated/prisma/client'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export default class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.passwordHash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
