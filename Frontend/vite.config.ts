import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // Load Environment Variables
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      // React
      react(),

      // React Compiler
      babel({
        presets: [reactCompilerPreset()],
      }),

      // Tailwind CSS v4
      tailwindcss(),
    ],

    // Dev Server
    server: {
      host: env.VITE_HOST || 'localhost',
      port: Number(env.VITE_PORT) || 5173,
      open: true,
    },

    // Preview Server
    preview: {
      host: env.VITE_HOST || 'localhost',
      port: Number(env.VITE_PREVIEW_PORT) || 4173,
    },

    // Build Settings
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'esbuild',
      chunkSizeWarningLimit: 1000,

      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
    },

    // Dependency Optimization
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
  }
})