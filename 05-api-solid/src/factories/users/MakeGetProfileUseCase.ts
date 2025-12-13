import PrismaUsersRepository from '@/repositories/prisma/PrismaUsersRepository'
import GetProfileUseCase from '@/useCases/users/GetProfileUseCase'

export default function MakeGetProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new GetProfileUseCase(usersRepository)
}
