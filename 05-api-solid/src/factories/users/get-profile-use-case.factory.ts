import PrismaUsersRepository from '@/repositories/prisma/prisma-users.repository'
import GetProfile from '@/use-cases/users/get-profile'

export default function GetProfileUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository()
  return new GetProfile(usersRepository)
}
