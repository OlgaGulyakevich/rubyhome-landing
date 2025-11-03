/**
 * Scroll Progress Indicator
 * Visual indicator showing page scroll progress
 * Works on all pages without GSAP dependency
 */

/**
 * Create and animate scroll progress bar using native JavaScript
 * Updates progress bar width based on scroll position
 */
export const initScrollProgress = () => {
  // Create progress bar element
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.setAttribute('role', 'progressbar');
  progressBar.setAttribute('aria-label', 'Page scroll progress');
  progressBar.setAttribute('aria-valuemin', '0');
  progressBar.setAttribute('aria-valuemax', '100');
  progressBar.setAttribute('aria-valuenow', '0');

  // Create inner fill
  const progressFill = document.createElement('div');
  progressFill.className = 'scroll-progress__fill';
  progressBar.appendChild(progressFill);

  // Add to document
  document.body.appendChild(progressBar);

  /**
   * Updates progress bar on scroll
   * Calculates scroll percentage and updates width
   */
  const updateProgress = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    // Update width
    progressFill.style.width = `${progress}%`;

    // Update ARIA attribute for accessibility
    progressBar.setAttribute('aria-valuenow', Math.round(progress));
  };

  // Initial update
  updateProgress();

  // Update on scroll (throttled with requestAnimationFrame)
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  });

  console.log('✅ Scroll progress indicator initialized');
};

/**
 * Add CSS for scroll progress bar
 * Injects styles dynamically to support all pages
 */
export const addScrollProgressStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: transparent;
      z-index: 9999;
      pointer-events: none;
    }

    .scroll-progress__fill {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #2e6eff 0%, #fe753f 100%);
      transform-origin: left;
      transition: width 0.1s ease-out;
      box-shadow: 0 0 10px rgba(254, 117, 63, 0.5);
    }

    /* Make progress bar more visible when scrolling */
    @media (prefers-reduced-motion: no-preference) {
      .scroll-progress__fill {
        transition: width 0.1s ease-out;
      }
    }

    /* Respect reduced motion preference */
    @media (prefers-reduced-motion: reduce) {
      .scroll-progress__fill {
        transition: none;
      }
    }
  `;
  document.head.appendChild(style);
};
