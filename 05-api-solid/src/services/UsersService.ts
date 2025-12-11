import { hash } from 'bcryptjs'
import UsersRepositoryInterface from '@/repositories/UsersRepositoryInterface'
import UserExistsError from '@/errors/UserExistsError'
import { User } from '../../generated/prisma/client'

interface UserRegisterRequest {
  name: string
  email: string
  password: string
}

interface UserRegisterResponse {
  user: User
}

export default class UsersService {
  constructor(private userRepository: UsersRepositoryInterface) {}

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
