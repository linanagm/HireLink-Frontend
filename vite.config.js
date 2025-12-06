import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import flowbiteReact from "flowbite-react/plugin/vite"
//import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    flowbiteReact()
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  
  // resolve: {
  //   alias: {
  //     // eslint-disable-next-line no-undef
  //     '@': path.resolve(__dirname, './src')
  //   }
  }
})
