import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { imagetools } from 'vite-imagetools';
import { resolve } from 'path';

/**
 * Vite configuration for RubyHome landing page
 * Handles multi-page setup, asset optimization, image optimization, and production build settings
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
    }),
    
    // Image optimization with vite-imagetools
    // Supports format conversion, resizing, and quality optimization
    // Usage in HTML: <img src="image.jpg?format=webp&w=800">
    imagetools({
      defaultDirectives: (url) => {
        // Default optimization for all images
        return new URLSearchParams({
          format: 'webp',
          quality: '85'
        });
      }
    })
  ]
});

