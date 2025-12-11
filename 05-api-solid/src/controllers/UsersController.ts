import { FastifyReply, FastifyRequest } from 'fastify'
import RegisterUseCase from '@/useCases/users/RegisterUseCase'
import UserExistsError from '@/errors/UserExistsError'
import { registerBodySchema } from '@/validations/usersValidations'

export default function UserController(userService: RegisterUseCase) {
  return {
    register: async (
      request: FastifyRequest,
      reply: FastifyReply,
    ): Promise<void> => {
      const { name, email, password } = registerBodySchema.parse(request.body)

      try {
        await userService.register({ name, email, password })
      } catch (error) {
        if (error instanceof UserExistsError) {
          return reply.status(409).send({ message: error.message })
        }

        throw error
      }

      return reply.status(201).send()
    },
  }
}
