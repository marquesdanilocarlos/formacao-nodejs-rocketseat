import 'dotenv/config'
import { execSync } from 'node:child_process'
import { prisma } from '../src/prisma-e2e'

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL env variable')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)
  url.searchParams.set('options', `-csearch_path=${schema}`)

  return url.toString()
}

export default async function setup() {
  // Use um nome único para evitar colisões entre runs paralelos (opcional)
  const schema = 'test'

  const databaseUrl = generateDatabaseUrl(schema)
  process.env.DATABASE_URL = databaseUrl

  execSync('npx prisma db push --schema=prisma/e2e.prisma', {
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
    },
  })

  return async function teardown() {
    try {
      await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "test" CASCADE`)
    } finally {
      await prisma.$disconnect()
    }
  }
}
