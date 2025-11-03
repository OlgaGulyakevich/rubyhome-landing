/**
 * Magnetic Buttons
 * Buttons follow mouse cursor with smooth animation
 */

import { gsap } from 'gsap';

/**
 * Initialize magnetic effect for hero CTA button
 * Only works on non-touch devices
 */
export const initMagneticButtons = () => {
  // Only enable on non-touch devices
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) return;

  const magneticButtons = document.querySelectorAll('.hero__cta-button');

  if (magneticButtons.length === 0) return;

  magneticButtons.forEach((button) => {
    // Add magnetic class for styling
    button.classList.add('is-magnetic');
    
    // Set initial transform origin
    button.style.transformOrigin = 'center center';
    button.style.willChange = 'transform';

    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.1,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
    });

    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const centerX = e.clientX - rect.left - rect.width / 2;
      const centerY = e.clientY - rect.top - rect.height / 2;

      // Асимметричное движение:
      // - Вправо ОЧЕНЬ большое движение (до 80px)
      // - Влево меньше (до 25px)
      // - Вниз большое движение (до 60px)
      // - Вверх минимум (до 10px) - чтобы не перекрывать текст
      
      let moveX, moveY;
      
      // Горизонталь: больше вправо
      if (centerX > 0) {
        moveX = Math.min(80, centerX * 1.2);
      } else {
        moveX = Math.max(-25, centerX * 0.5);
      }
      
      // Вертикаль: больше вниз, минимум вверх
      if (centerY > 0) {
        moveY = Math.min(60, centerY * 1.0);
      } else {
        moveY = Math.max(-10, centerY * 0.3);
      }

      gsap.to(button, {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });
  });
};
