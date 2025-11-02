/**
 * Lenis Smooth Scroll Controller
 * Integrates Lenis smooth scroll with GSAP ScrollTrigger
 */

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes Lenis smooth scroll and integrates with GSAP
 * @returns {Lenis} Lenis instance
 */
export const initSmoothScroll = () => {
  // Create Lenis instance
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // Integrate Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Stop smooth scroll when using anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href !== '#') {
        lenis.scrollTo(href, {
          offset: -80, // Header offset
          duration: 1.5,
        });
      }
    });
  });

  console.log('✅ Smooth scroll initialized (Lenis + GSAP)');

  return lenis;
};