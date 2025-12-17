import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    name: 'e2e',
    dir: 'src/controllers',
    environment: './prisma/prisma-test-enviroment.ts',
  },
})
