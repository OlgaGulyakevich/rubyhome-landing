/**
 * PostCSS configuration for CSS processing
 * Handles autoprefixing and minification for production
 * 
 * @returns {Object} PostCSS configuration with plugins
 */
export default {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        'last 2 versions',
        '> 1%',
        'not dead',
        'iOS >= 12',
        'Safari >= 12'
      ],
      grid: 'autoplace'
    },
    cssnano: {
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true
          },
          normalizeWhitespace: true
        }
      ]
    }
  }
};

