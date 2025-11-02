/**
 * 3D Tilt Effect
 * Property cards with 3D tilt on mouse move
 */

import VanillaTilt from 'vanilla-tilt';

/**
 * Initialize 3D tilt effect for property cards
 */
export const init3DTilt = () => {
  const cards = document.querySelectorAll('.property-card');

  if (cards.length === 0) return;

  // Apply tilt effect to each card
  VanillaTilt.init(cards, {
    max: 8, // Maximum tilt angle in degrees
    speed: 400, // Speed of tilt animation
    glare: true, // Enable glare effect
    'max-glare': 0.2, // Maximum glare opacity
    scale: 1.02, // Scale on hover
    perspective: 1000, // Perspective value
    transition: true, // Enable CSS transition
    easing: 'cubic-bezier(.03,.98,.52,.99)',
  });

  // Refresh on window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      cards.forEach((card) => {
        if (card.vanillaTilt) {
          card.vanillaTilt.destroy();
          VanillaTilt.init(card, {
            max: 8,
            speed: 400,
            glare: true,
            'max-glare': 0.2,
            scale: 1.02,
            perspective: 1000,
            transition: true,
            easing: 'cubic-bezier(.03,.98,.52,.99)',
          });
        }
      });
    }, 200);
  });

  console.log(`✅ 3D tilt effect initialized (${cards.length} cards)`);
};
