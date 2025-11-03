/**
 * Parallax Effects
 * GSAP-based parallax scrolling for hero section
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize hero parallax effect
 * Background image moves slower than content for depth effect
 * Works on all devices
 */
export const initHeroParallax = () => {
  const hero = document.querySelector('.hero');
  const heroImage = document.querySelector('.hero__image');
  const heroContent = document.querySelector('.hero__content');

  if (!hero || !heroContent) return;

  // Parallax effect for hero image (background moves slower)
  if (heroImage) {
    gsap.to(heroImage, {
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1, // Smoothness (0-3, higher = smoother but more lag)
      },
      y: -100, // Image moves up (reduced from -150 to avoid black space)
      ease: 'none',
    });
  }

  // Content moves down creating parallax depth effect
  gsap.to(heroContent, {
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
    y: 60, // Content moves down (reduced from 80 for smoother effect)
    ease: 'none',
  });
};

/**
 * Initialize advantages parallax effect (mobile version)
 * Two-layer parallax: background moves slower, text moves faster
 * Creates depth effect similar to hero section
 * On mobile: uses .advantages__header background-image
 * On desktop: uses .advantages__image element
 */
export const initAdvantagesParallax = () => {
  const advantages = document.querySelector('.advantages');
  const advantagesHeader = document.querySelector('.advantages__header');
  const advantagesTitle = document.querySelector('.advantages__title');
  const advantagesSubtitle = document.querySelector('.advantages__subtitle');
  const advantagesImage = document.querySelector('.advantages__image');

  if (!advantages) return;

  // Mobile/Tablet: parallax for header background (≤1023px)
  if (advantagesHeader && window.innerWidth < 1024) {
    // Background layer (moves slower - up)
    gsap.to(advantagesHeader, {
      scrollTrigger: {
        trigger: advantagesHeader,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      backgroundPosition: 'center 50%', // Background moves up significantly (from 30% to 50%)
      ease: 'none',
    });

    // Text layer (moves faster - down) for MAXIMUM depth effect
    const textElements = [advantagesTitle, advantagesSubtitle].filter(Boolean);
    if (textElements.length > 0) {
      gsap.to(textElements, {
        scrollTrigger: {
          trigger: advantagesHeader,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: 120, // INCREASED: Text moves down 120px (from 80px) for dramatic effect
        ease: 'none',
      });
    }
  }

  // Desktop: parallax for image element (≥1024px)
  if (advantagesImage && window.innerWidth >= 1024) {
    gsap.to(advantagesImage, {
      scrollTrigger: {
        trigger: advantages,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      y: -60, // Image moves up
      ease: 'none',
    });
  }
};
