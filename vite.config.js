import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/mwangaza_hub/', // IMPORTANT: add your subdirectory here
  plugins: [react()]
})
