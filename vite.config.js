import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { resolve } from 'path';

/**
 * Vite configuration for RubyHome landing page
 * Handles multi-page setup, asset optimization, and production build settings
 * 
 * @returns {import('vite').UserConfig} Vite configuration object
 */
export default defineConfig({
  root: './',
  base: './',
  
  // Multi-page configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        privacy: resolve(process.cwd(), 'privacy-policy.html')
      },
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').pop();
          
          // Organize assets by type
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) {
            return `assets/img/[name]-[hash][extname]`;
          } else if (/woff2?|ttf|otf|eot/i.test(extType)) {
            return `assets/fonts/[name][extname]`;
          }
          
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 500
  },
  
  // Development server configuration
  server: {
    port: 3000,
    open: true,
    cors: true,
    host: true
  },
  
  // CSS optimization
  css: {
    devSourcemap: true,
    postcss: './postcss.config.js'
  },
  
  // Plugins
  plugins: [
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'RubyHome - Premium Real Estate',
          description: 'Find your dream home with expert guidance.'
        }
      }
    })
    // Note: Image optimization can be added later with vite-plugin-imagemin
    // or handled manually with tools like imagemin-cli
  ]
});

