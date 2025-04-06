import { defineVitestConfig } from '@nuxt/test-utils/config'
import AutoImport from 'unplugin-auto-import/vite'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
  },
  plugins: [
    AutoImport({
      imports: ['vitest'],
    }),
  ],
  define: process.env.VITEST ? {} : { global: 'window' },
})
