/**
 * Main JavaScript Entry Point
 * Imports and initializes all application modules
 */

// Import modules
import { initModals } from './modal.js';
import { initReviewsSlider } from './slider.js';
import { handleFormSubmit } from './form-validation.js';

/**
 * Initializes the entire application
 * Sets up all event listeners and modules
 */
const init = () => {
  console.log('🚀 RubyHome Application Initialized');

  // Initialize modals
  initModals();

  // Initialize slider
  initReviewsSlider('.reviews__slider');

  // Setup form handlers
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    form.addEventListener('submit', handleFormSubmit);
  });

  // TODO: Phase 4 - Add more initialization logic
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

