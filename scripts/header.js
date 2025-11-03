/**
 * Header/Navigation module
 * Handles smooth scroll, active state, and nav link interactions
 * Features: Smooth scroll to sections, URL hash update, active link highlighting, cross-page navigation
 */

/**
 * Checks if we are on the main page (index.html or root)
 * @returns {boolean} True if on main page
 */
const isMainPage = () => {
  const path = window.location.pathname;
  return path === '/' || path.endsWith('index.html') || path.endsWith('/');
};

/**
 * Smoothly scrolls to a section
 * @param {string} sectionId - ID of the section to scroll to
 */
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);

  if (!section) {
    console.warn(`Section with ID "${sectionId}" not found`);
    return;
  }

  // Get header height for offset
  const header = document.querySelector('.header');
  const headerHeight = header ? header.offsetHeight : 0;

  // Calculate target position
  const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;

  // Smooth scroll
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });
};

/**
 * Updates active state of navigation links
 */
const updateActiveNavLink = () => {
  const navLinks = document.querySelectorAll('.header__nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Get current scroll position
  const scrollPosition = window.scrollY + 100; // Offset for better UX

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    // Check if section is in viewport
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Remove active class from all links
      navLinks.forEach((link) => {
        link.classList.remove('header__nav-link--active');
      });

      // Add active class to current section link
      const activeLink = document.querySelector(`.header__nav-link[href*="${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('header__nav-link--active');
      }
    }
  });
};

/**
 * Adds click animation to nav link
 * @param {HTMLElement} link - Nav link element
 */
const addClickAnimation = (link) => {
  // Add clicking class
  link.classList.add('header__nav-link--clicking');

  // Remove after animation (300ms)
  setTimeout(() => {
    link.classList.remove('header__nav-link--clicking');
  }, 300);
};

/**
 * Initializes navigation functionality
 * - Smooth scroll to sections (on main page)
 * - Cross-page navigation (from other pages)
 * - Active state on scroll
 * - URL hash update
 * - Click animation
 */
export const initNavigation = () => {
  const navLinks = document.querySelectorAll('.header__nav-link');

  if (navLinks.length === 0) {
    console.warn('No navigation links found');
    return;
  }

  // Add click handlers to nav links
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      const hasHash = href.includes('#');

      // If link has hash
      if (hasHash) {
        const sectionId = href.replace(/.*#/, ''); // Extract ID from href

        // If we're on main page - smooth scroll
        if (isMainPage()) {
          event.preventDefault();

          // Add click animation
          addClickAnimation(link);

          // Scroll to section
          scrollToSection(sectionId);

          // Update URL hash (without jumping)
          if (history.pushState) {
            history.pushState(null, null, `#${sectionId}`);
          } else {
            window.location.hash = sectionId;
          }
        } else {
          // If we're on another page (like privacy-policy) - navigate to main page with hash
          // Let the default behavior work (will go to index.html#section)
          // The smooth scroll will happen after page load
        }
      }
    });
  });

  // Only setup scroll listener on main page (where sections exist)
  if (isMainPage()) {
    // Update active state on scroll (throttled)
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveNavLink();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Set initial active state
    updateActiveNavLink();

    // Handle direct URL hash navigation
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      // Small delay to ensure page is loaded
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    }
  }

  console.log('✅ Navigation initialized');
};
