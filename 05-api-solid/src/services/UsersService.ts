import { hash } from 'bcryptjs'
import UsersRepositoryInterface from '@/repositories/UsersRepositoryInterface'
import UserExistsError from '@/errors/UserExistsError'

interface UserRegisterRequest {
  name: string
  email: string
  password: string
}

export default class UsersService {
  constructor(private userRepository: UsersRepositoryInterface) {}

  async register({ name, email, password }: UserRegisterRequest) {
    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserExistsError()
    }

    const passwordHash = await hash(password, 6)

    await this.userRepository.create({
      name,
      email,
      passwordHash,
    })
  }
}
