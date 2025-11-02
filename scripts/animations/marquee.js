/**
 * Marquee Animation
 * Infinite scrolling for partners logos
 */

import { gsap } from 'gsap';

/**
 * Initialize marquee animation for partners section
 */
export const initPartnersMarquee = () => {
  const partnersContainer = document.querySelector('.partners__list');

  if (!partnersContainer) return;

  const partners = Array.from(partnersContainer.children);

  if (partners.length === 0) return;

  // Clone partners for seamless loop
  const clone = partnersContainer.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  partnersContainer.parentNode.appendChild(clone);

  // Calculate total width
  const totalWidth = partnersContainer.scrollWidth;

  // Create infinite animation
  const tl = gsap.timeline({
    repeat: -1,
    defaults: {
      ease: 'none',
    },
  });

  // Animate original
  tl.to(partnersContainer, {
    x: -totalWidth,
    duration: 20,
  });

  // Animate clone
  tl.to(
    clone,
    {
      x: -totalWidth,
      duration: 20,
    },
    0
  );

  // Pause on hover
  partnersContainer.addEventListener('mouseenter', () => {
    tl.pause();
  });

  partnersContainer.addEventListener('mouseleave', () => {
    tl.resume();
  });

  clone.addEventListener('mouseenter', () => {
    tl.pause();
  });

  clone.addEventListener('mouseleave', () => {
    tl.resume();
  });

  console.log('✅ Partners marquee animation initialized');
};
