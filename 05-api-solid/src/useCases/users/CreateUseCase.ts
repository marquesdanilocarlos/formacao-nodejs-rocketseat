import { hash } from 'bcryptjs'
import UsersRepositoryInterface from "@/repositories/UsersRepositoryInterface";

interface CreateUseCaseRequest {
  name: string
  email: string
  password: string
}

export default class CreateUseCase {

  constructor(private usersRepository: UsersRepositoryInterface){}

  async execute({
                  name,
                  email,
                  password,
                }: CreateUseCaseRequest) {

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('Já existe um usuário com esse email.')
    }

    const passwordHash = await hash(password, 6)

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })

  }
}
