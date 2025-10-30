/**
 * Main JavaScript Entry Point
 * Imports and initializes all application modules
 */

// Import modules
import { initModals } from './modal.js';
import { initReviewsSlider } from './slider.js';
import { handleFormSubmit } from './form-validation.js';

/**
 * Initializes mobile menu toggle functionality
 * Handles burger menu open/close with proper ARIA attributes
 */
const initMobileMenu = () => {
  const menuToggle = document.querySelector('.header__menu-toggle');
  const nav = document.querySelector('.header__nav');
  
  if (!menuToggle || !nav) return;

  /**
   * Toggles mobile menu state and updates ARIA attributes
   * @param {Event} event - Click event
   */
  const handleToggleMenu = (event) => {
    event.preventDefault();
    
    const isOpen = nav.classList.contains('header__nav--open');
    
    // Toggle menu visibility
    nav.classList.toggle('header__nav--open');
    menuToggle.classList.toggle('header__menu-toggle--active');
    
    // Update ARIA attributes for accessibility
    menuToggle.setAttribute('aria-expanded', !isOpen);
    menuToggle.setAttribute('aria-label', 
      isOpen ? 'Открыть меню навигации' : 'Закрыть меню навигации'
    );
  };

  menuToggle.addEventListener('click', handleToggleMenu);

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    const isClickInsideMenu = nav.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnToggle && nav.classList.contains('header__nav--open')) {
      nav.classList.remove('header__nav--open');
      menuToggle.classList.remove('header__menu-toggle--active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Открыть меню навигации');
    }
  });

  // Close menu when pressing Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('header__nav--open')) {
      nav.classList.remove('header__nav--open');
      menuToggle.classList.remove('header__menu-toggle--active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Открыть меню навигации');
      menuToggle.focus(); // Return focus to toggle button
    }
  });
};

/**
 * Initializes the entire application
 * Sets up all event listeners and modules
 */
const init = () => {
  console.log('🚀 RubyHome Application Initialized');

  // Initialize mobile menu
  initMobileMenu();

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

