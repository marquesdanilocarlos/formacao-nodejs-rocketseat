import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import UsersService from '@/services/UsersService'
import UserExistsError from '@/errors/UserExistsError'

export default function UserController(userService: UsersService) {
  return {
    register: async (
      request: FastifyRequest,
      reply: FastifyReply,
    ): Promise<void> => {
      const registerBodySchema = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string().min(6),
      })

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
