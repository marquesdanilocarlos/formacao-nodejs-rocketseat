import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import UserService from '@/services/UserService'

export default function UserController(userService: UserService) {
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
        console.log(error)
        return reply.status(409).send()
      }

      return reply.status(201).send()
    },
  }
}
