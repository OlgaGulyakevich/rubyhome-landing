/**
 * Scroll Reveal Animations
 * GSAP ScrollTrigger animations for sections reveal
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero section reveal animation
 * Fade-in + scale effect
 */
export const initHeroReveal = () => {
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero__content');
  const heroTitle = document.querySelector('.hero__title');
  const heroDescription = document.querySelector('.hero__description');
  const heroButton = document.querySelector('.hero__cta-button');

  if (!hero || !heroContent) return;

  // Set initial states
  gsap.set([heroTitle, heroDescription, heroButton], {
    opacity: 0,
    y: 50,
  });

  // Create timeline
  const tl = gsap.timeline({
    defaults: {
      duration: 1,
      ease: 'power3.out',
    },
  });

  // Animate on page load
  tl.to(heroTitle, {
    opacity: 1,
    y: 0,
    duration: 1.2,
  })
    .to(
      heroDescription,
      {
        opacity: 1,
        y: 0,
      },
      '-=0.8'
    )
    .to(
      heroButton,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      '-=0.6'
    );

  console.log('✅ Hero reveal animation initialized');
};

/**
 * Properties cards stagger animation
 * Cards appear one by one with delay
 */
export const initPropertiesStagger = () => {
  const cards = gsap.utils.toArray('.property-card');

  if (cards.length === 0) return;

  gsap.set(cards, {
    opacity: 0,
    y: 80,
    scale: 0.9,
  });

  ScrollTrigger.batch(cards, {
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    },
    start: 'top 80%',
    once: true,
  });

  console.log(`✅ Properties stagger animation initialized (${cards.length} cards)`);
};

/**
 * Advantages cards reveal animation
 * Cards fade in and slide up
 */
export const initAdvantagesReveal = () => {
  const cards = gsap.utils.toArray('.advantage-card');
  const image = document.querySelector('.advantages__image');

  if (cards.length === 0) return;

  // Cards animation
  gsap.set(cards, {
    opacity: 0,
    y: 60,
  });

  ScrollTrigger.batch(cards, {
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    },
    start: 'top 75%',
    once: true,
  });

  // Image reveal with scale
  if (image) {
    gsap.set(image, {
      opacity: 0,
      scale: 0.8,
    });

    ScrollTrigger.create({
      trigger: image,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(image, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
        });
      },
    });
  }

  console.log(`✅ Advantages reveal animation initialized (${cards.length} cards)`);
};

/**
 * Reviews section fade-in animation
 * Entire section fades in smoothly
 */
export const initReviewsReveal = () => {
  const reviews = document.querySelector('.reviews');
  const reviewsHeader = document.querySelector('.reviews__header');
  const reviewsSlider = document.querySelector('.reviews__swiper');

  if (!reviews) return;

  gsap.set([reviewsHeader, reviewsSlider], {
    opacity: 0,
    y: 40,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: reviews,
      start: 'top 70%',
      once: true,
    },
  });

  tl.to(reviewsHeader, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
  }).to(
    reviewsSlider,
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    },
    '-=0.4'
  );

  console.log('✅ Reviews reveal animation initialized');
};

/**
 * Text split reveal animation
 * Reveals text line by line for titles and subtitles
 */
export const initTextSplitReveal = () => {
  // Animate titles
  const titles = document.querySelectorAll(
    '.partners__title, .properties__title, .advantages__title, .reviews__title, .cta__title'
  );

  // Animate subtitles
  const subtitles = document.querySelectorAll(
    '.advantages__subtitle, .reviews__subtitle, .cta__subtitle'
  );

  const allElements = [...titles, ...subtitles];

  if (allElements.length === 0) return;

  allElements.forEach((element) => {
    // Split text into lines
    const split = new SplitType(element, {
      types: 'lines',
      lineClass: 'line',
    });

    // Wrap lines in overflow container
    const lines = split.lines;
    lines.forEach((line) => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);

      // Set initial state
      gsap.set(line, {
        y: '100%',
        opacity: 0,
      });
    });

    // Create scroll trigger for reveal
    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(lines, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        });
      },
    });
  });

  console.log(`✅ Text split reveal initialized (${titles.length} titles, ${subtitles.length} subtitles)`);
};

/**
 * Partners section fade-in
 */
export const initPartnersReveal = () => {
  const partners = document.querySelectorAll('.partners__item');

  if (partners.length === 0) return;

  gsap.set(partners, {
    opacity: 0,
    scale: 0.8,
  });

  ScrollTrigger.batch(partners, {
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(1.4)',
        overwrite: 'auto',
      });
    },
    start: 'top 80%',
    once: true,
  });

  console.log(`✅ Partners reveal animation initialized (${partners.length} items)`);
};

/**
 * CTA section reveal
 */
export const initCTAReveal = () => {
  const cta = document.querySelector('.cta');
  const ctaTitle = document.querySelector('.cta__title');
  const ctaSubtitle = document.querySelector('.cta__subtitle');
  const ctaForm = document.querySelector('.cta__form');

  if (!cta) return;

  gsap.set([ctaTitle, ctaSubtitle, ctaForm], {
    opacity: 0,
    y: 40,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: cta,
      start: 'top 70%',
      once: true,
    },
  });

  tl.to(ctaTitle, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
  })
    .to(
      ctaSubtitle,
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
      },
      '-=0.5'
    )
    .to(
      ctaForm,
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
      },
      '-=0.4'
    );

  console.log('✅ CTA reveal animation initialized');
};

/**
 * Initialize all scroll reveal animations
 */
export const initAllScrollReveals = () => {
  initHeroReveal();
  initPartnersReveal();
  initPropertiesStagger();
  initAdvantagesReveal();
  initReviewsReveal();
  initTextSplitReveal();
  initCTAReveal();

  console.log('🎬 All scroll reveal animations initialized');
};
