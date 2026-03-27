import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor: React core
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react'
          }
          // Vendor: framer-motion (heavy)
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion'
          }
          // Vendor: recharts (heavy)
          if (id.includes('node_modules/recharts') || id.includes('node_modules/d3-')) {
            return 'vendor-charts'
          }
          // Vendor: router
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router'
          }
          // Vendor: primereact + primeicons
          if (id.includes('node_modules/primereact') || id.includes('node_modules/primeicons')) {
            return 'vendor-prime'
          }
        },
      },
    },
  },
})
