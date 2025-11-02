/**
 * Scroll Progress Indicator
 * Visual indicator showing page scroll progress
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Create and animate scroll progress bar
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

  // Animate progress fill
  gsap.to(progressFill, {
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
      onUpdate: (self) => {
        const progress = Math.round(self.progress * 100);
        progressBar.setAttribute('aria-valuenow', progress);
      },
    },
    width: '100%',
    ease: 'none',
  });

  console.log('✅ Scroll progress indicator initialized');
};

/**
 * Add CSS for scroll progress bar
 */
export const addScrollProgressStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: rgba(46, 110, 255, 0.1);
      z-index: 9999;
      pointer-events: none;
    }

    .scroll-progress__fill {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #2e6eff 0%, #fe753f 100%);
      transform-origin: left;
    }
  `;
  document.head.appendChild(style);
};
