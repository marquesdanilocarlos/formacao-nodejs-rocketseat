import { z } from 'zod'

export const doCheckinBodySchema = z.object({
  latitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 180
  }),
})

export const doCheckinParamsSchema = z.object({
  gymId: z.uuid(),
})

export const getHisttoryQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
})

export const validateCheckinParamsSchema = z.object({
  checkInId: z.uuid(),
})
