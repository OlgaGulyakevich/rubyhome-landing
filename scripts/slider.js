/**
 * Slider module
 * Handles initialization and control of Swiper sliders
 */

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/**
 * Initializes the reviews slider with Swiper
 * Mobile: 1 slide with navigation arrows
 * Desktop: 2 slides with pagination dots
 * @returns {Object|null} Swiper instance or null if initialization fails
 */
export const initReviewsSlider = () => {
  const swiperContainer = document.querySelector('.reviews__swiper');

  if (!swiperContainer) {
    console.warn('Reviews slider container not found');
    return null;
  }

  try {
    const swiper = new Swiper('.reviews__swiper', {
      // Configure Swiper to use modules
      modules: [Navigation, Pagination],

      // Basic settings
      slidesPerView: 1,
      spaceBetween: 20,
      loop: false,
      grabCursor: true,

      // Pagination (dots) - visible on desktop
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: false,
      },

      // Navigation arrows - visible on mobile
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // Keyboard control
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },

      // Accessibility
      a11y: {
        prevSlideMessage: 'Previous review',
        nextSlideMessage: 'Next review',
        paginationBulletMessage: 'Go to review {{index}}',
      },

      // Responsive breakpoints
      breakpoints: {
        // Mobile (default above)
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        // Tablet
        768: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
        // Desktop - 2 slides
        1024: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
      },

      // Events
      on: {
        init: function () {
          console.log('✅ Reviews slider initialized');
          console.log(`   Total slides: ${this.slides.length}`);
          console.log(`   Slides per view: ${this.params.slidesPerView}`);
        },
        slideChange: function () {
          console.log(`Slide changed to: ${this.activeIndex + 1}`);
        },
      },
    });

    return swiper;
  } catch (error) {
    console.error('Error initializing reviews slider:', error);
    return null;
  }
};

