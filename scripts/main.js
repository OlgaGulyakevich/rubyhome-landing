/**
 * Main JavaScript Entry Point
 * RubyHome Landing Page
 *
 * Модульная архитектура:
 * - Phase A: Базовый функционал (modal, slider, forms, navigation)
 * - Phase B: Scroll анимации (GSAP + Lenis, reveal, stagger, text split)
 * - Phase C: Продвинутые эффекты (parallax, magnetic buttons, 3D tilt, marquee, scroll progress)
 */

// ============================================
// PHASE A: Base Functionality
// ============================================
import { initModals } from './modal.js';
import { initReviewsSlider } from './slider.js';
import { initFormValidation } from './form-validation.js';
import { initNavigation } from './header.js';

// ============================================
// PHASE B: Scroll Animations (GSAP + Lenis)
// ============================================
import { initSmoothScroll } from './animations/smooth-scroll.js';
import { initAllScrollReveals } from './animations/scroll-reveal.js';

// ============================================
// PHASE C: Advanced Effects
// ============================================
import { initHeroParallax, initAdvantagesParallax } from './animations/parallax.js';
import { initMagneticButtons } from './animations/magnetic.js';
import { init3DTilt } from './animations/tilt.js';
import { initPartnersMarquee } from './animations/marquee.js';
import { initScrollProgress, addScrollProgressStyles } from './animations/scroll-progress.js';

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

    // Block body scroll when menu is open
    document.body.style.overflow = isOpen ? '' : 'hidden';

    // Update ARIA attributes for accessibility
    menuToggle.setAttribute('aria-expanded', !isOpen);
    menuToggle.setAttribute('aria-label',
      isOpen ? 'Open navigation menu' : 'Close navigation menu'
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
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
      document.body.style.overflow = '';
    }
  });

  // Close menu when pressing Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('header__nav--open')) {
      nav.classList.remove('header__nav--open');
      menuToggle.classList.remove('header__menu-toggle--active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
      menuToggle.focus(); // Return focus to toggle button
      document.body.style.overflow = '';
    }
  });

  // Close menu when clicking on nav link
  const navLinks = nav.querySelectorAll('.header__nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('header__nav--open')) {
        nav.classList.remove('header__nav--open');
        menuToggle.classList.remove('header__menu-toggle--active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
        document.body.style.overflow = '';
      }
    });
  });
};

/**
 * Initializes the entire application
 * Sets up all event listeners and modules
 */
const init = () => {
  console.log('🚀 RubyHome Application Initialized');

  // ============================================
  // PHASE A: Base Functionality
  // ============================================

  // 1. Mobile menu
  initMobileMenu();

  // 2. Navigation (smooth scroll + active states)
  initNavigation();

  // 3. Modals (contact form modal)
  initModals();

  // 4. Slider (Swiper for reviews)
  initReviewsSlider();

  // 5. Form validation (all forms)
  initFormValidation();

  // ============================================
  // PHASE B: Scroll Animations (GSAP + Lenis)
  // ============================================

  // Initialize smooth scroll
  initSmoothScroll();

  // Initialize all scroll reveal animations
  initAllScrollReveals();

  console.log('✅ Phase A: Base functionality loaded');
  console.log('🎬 Phase B: Scroll animations loaded');

  // ============================================
  // PHASE C: Advanced Effects
  // ============================================

  // Add scroll progress styles
  addScrollProgressStyles();

  // Initialize scroll progress indicator
  initScrollProgress();

  // Hero parallax effect
  initHeroParallax();

  // Advantages parallax effect (mobile)
  initAdvantagesParallax();

  // Magnetic buttons for hero CTA
  initMagneticButtons();

  // 3D tilt effect for property cards
  init3DTilt();

  // Partners marquee animation
  initPartnersMarquee();

  console.log('✨ Phase C: Advanced effects loaded');
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
