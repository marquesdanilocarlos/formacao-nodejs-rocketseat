import fastify, { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'

const app: FastifyInstance = fastify()

const prisma = new PrismaClient()

export default app
