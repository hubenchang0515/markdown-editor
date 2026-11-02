import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { sitemapPlugin } from './plugins/sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()],
      plugins: ['@emotion/babel-plugin'],
    }),
    sitemapPlugin(),
  ],
  base: "markdown-editor"
})
