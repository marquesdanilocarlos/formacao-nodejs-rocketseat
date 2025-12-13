import RegisterUseCase from '@/useCases/users/RegisterUseCase'
import PrismaUsersRepository from '@/repositories/prisma/PrismaUsersRepository'

export default function MakeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new RegisterUseCase(usersRepository)
}
