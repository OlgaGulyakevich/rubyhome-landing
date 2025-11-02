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

  if (!partnersContainer) {
    console.log('⚠️ Partners list not found');
    return;
  }

  const partners = Array.from(partnersContainer.children);

  if (partners.length === 0) {
    console.log('⚠️ No partners found');
    return;
  }

  // Create wrapper for marquee
  const wrapper = document.createElement('div');
  wrapper.style.display = 'flex';
  wrapper.style.willChange = 'transform';

  // Move original list into wrapper
  const parent = partnersContainer.parentNode;
  parent.insertBefore(wrapper, partnersContainer);
  wrapper.appendChild(partnersContainer);

  // Clone partners for seamless loop
  const clone = partnersContainer.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  wrapper.appendChild(clone);

  // Calculate total width including gap
  const totalWidth = partnersContainer.offsetWidth;

  // Create infinite animation with modifiers for seamless loop
  const animation = gsap.to(wrapper, {
    x: -totalWidth,
    duration: 20,
    ease: 'none',
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
    },
  });

  // Pause on hover
  wrapper.addEventListener('mouseenter', () => {
    animation.pause();
  });

  wrapper.addEventListener('mouseleave', () => {
    animation.resume();
  });

  console.log('✅ Partners marquee animation initialized');
};
