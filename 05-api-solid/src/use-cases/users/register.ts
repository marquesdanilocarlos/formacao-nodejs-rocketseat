import { hash } from 'bcryptjs'
import UsersRepository from '@/repositories/users-repository'
import UserExistsError from '@/errors/user-exists.error'
import { User } from '../../../generated/prisma/client'

interface UserRegisterRequest {
  name: string
  email: string
  password: string
}

interface UserRegisterResponse {
  user: User
}

export default class Register {
  constructor(private userRepository: UsersRepository) {}

  async register({
    name,
    email,
    password,
  }: UserRegisterRequest): Promise<UserRegisterResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserExistsError()
    }

    const passwordHash = await hash(password, 6)

    const user = await this.userRepository.create({
      name,
      email,
      passwordHash,
    })

    return {
      user,
    }
  }
}
