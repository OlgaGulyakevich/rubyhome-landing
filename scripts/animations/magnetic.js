/**
 * Magnetic Buttons
 * Buttons follow mouse cursor with smooth animation
 */

import { gsap } from 'gsap';

/**
 * Initialize magnetic effect for hero CTA button
 * Only works on desktop (non-touch devices)
 */
export const initMagneticButtons = () => {
  // Only enable on desktop (non-touch devices)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    console.log('⚠️ Magnetic buttons disabled on touch devices');
    return;
  }

  const magneticButtons = document.querySelectorAll('.hero__cta-button');

  if (magneticButtons.length === 0) {
    console.log('⚠️ No .hero__cta-button elements found');
    return;
  }

  magneticButtons.forEach((button) => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    });

    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Limit movement to 20px
      const limitedX = Math.max(-20, Math.min(20, x * 0.3));
      const limitedY = Math.max(-20, Math.min(20, y * 0.3));

      gsap.to(button, {
        x: limitedX,
        y: limitedY,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  });

  console.log(`✅ Magnetic buttons initialized (${magneticButtons.length} buttons)`);
};
