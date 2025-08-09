import { hash } from 'bcryptjs'
import PrismaUsersRepository from '@/repositories/PrismaUsersRepository'

interface CreateUseCaseRequest {
  name: string
  email: string
  password: string
}

export default async function createUseCase({
  name,
  email,
  password,
}: CreateUseCaseRequest) {
  const prismaUsersRepository = new PrismaUsersRepository()
  const userWithSameEmail = await prismaUsersRepository.findByEmail(email)

  if (userWithSameEmail) {
    throw new Error('Já existe um usuário com esse email.')
  }

  const passwordHash = await hash(password, 6)

  await prismaUsersRepository.create({
    name,
    email,
    password_hash: passwordHash,
  })
}
