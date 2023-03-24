import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'sass',
    transform(code, id) {
      if (id.endsWith('.scss')) {
        const result = sass.renderSync({ data: code })
        return { code: result.css.toString() }
      }
    }
  }],
})