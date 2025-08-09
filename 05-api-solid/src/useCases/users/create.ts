import prisma from '../../../prisma/prisma'
import { hash } from 'bcryptjs'

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
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('Já existe um usuário com esse email.')
  }

  const passwordHash = await hash(password, 6)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: passwordHash,
    },
  })
}
