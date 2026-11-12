import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base: './' keeps asset URLs relative for GitHub Pages sub-paths
export default defineConfig({
  plugins: [vue()],
  base: './',
})
