import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/ESCAPE_ROOM_PUZZLES_R2/' : '/',
  plugins: [react()],
}))
