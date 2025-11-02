/**
 * Parallax Effects
 * GSAP-based parallax scrolling for hero section
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize hero parallax effect
 * Background moves slower than foreground for depth
 */
export const initHeroParallax = () => {
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero__content');

  if (!hero || !heroContent) return;

  // Parallax effect for hero background
  gsap.to(hero, {
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
    backgroundPosition: '50% 100%',
    ease: 'none',
  });

  // Content moves at different speed for depth
  gsap.to(heroContent, {
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
    y: 200,
    opacity: 0.3,
    ease: 'none',
  });

  console.log('✅ Hero parallax effect initialized');
};
