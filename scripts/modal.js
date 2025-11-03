/**
 * Modal module
 * Handles opening and closing of modal windows
 * Features: Focus trap, body scroll lock, ESC key support, overlay click
 */

let activeModal = null;
let previousFocusElement = null;

/**
 * Locks body scroll when modal is open
 */
const lockBodyScroll = () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollbarWidth}px`;
};

/**
 * Unlocks body scroll when modal is closed
 */
const unlockBodyScroll = () => {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};

/**
 * Gets all focusable elements within a container
 * @param {HTMLElement} container - Container element
 * @returns {HTMLElement[]} Array of focusable elements
 */
const getFocusableElements = (container) => {
  const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  return Array.from(container.querySelectorAll(selector));
};

/**
 * Creates focus trap within modal
 * @param {HTMLElement} modal - Modal element
 */
const trapFocus = (modal) => {
  const focusableElements = getFocusableElements(modal);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = (event) => {
    if (event.key !== 'Tab') return;

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  modal.addEventListener('keydown', handleTabKey);

  // Store handler to remove later
  modal._focusTrapHandler = handleTabKey;
};

/**
 * Removes focus trap from modal
 * @param {HTMLElement} modal - Modal element
 */
const removeFocusTrap = (modal) => {
  if (modal._focusTrapHandler) {
    modal.removeEventListener('keydown', modal._focusTrapHandler);
    delete modal._focusTrapHandler;
  }
};

/**
 * Opens a modal window by its ID
 * @param {string} modalId - The ID of the modal to open
 */
export const openModal = (modalId) => {
  const modal = document.getElementById(modalId);

  if (!modal) {
    console.warn(`Modal with ID "${modalId}" not found`);
    return;
  }

  // Store current focus element to return later
  previousFocusElement = document.activeElement;

  // Close any open modal first
  if (activeModal) {
    closeModal();
  }

  // Show modal
  modal.setAttribute('aria-hidden', 'false');
  activeModal = modal;

  // Lock body scroll
  lockBodyScroll();

  // Set up focus trap
  trapFocus(modal);

  // Focus first input or button
  setTimeout(() => {
    const focusableElements = getFocusableElements(modal);
    const firstInput = focusableElements.find(el => el.tagName === 'INPUT');
    if (firstInput) {
      firstInput.focus();
    } else if (focusableElements[0]) {
      focusableElements[0].focus();
    }
  }, 100);

  console.log(`✅ Modal opened: ${modalId}`);
};

/**
 * Closes the currently active modal
 */
export const closeModal = () => {
  if (!activeModal) return;

  // Hide modal
  activeModal.setAttribute('aria-hidden', 'true');

  // Remove focus trap
  removeFocusTrap(activeModal);

  // Unlock body scroll
  unlockBodyScroll();

  // Return focus to previous element
  if (previousFocusElement) {
    previousFocusElement.focus();
  }

  console.log(`✅ Modal closed: ${activeModal.id}`);

  activeModal = null;
  previousFocusElement = null;
};

/**
 * Opens success modal after form submission
 */
export const openSuccessModal = () => {
  // Close contact modal first
  closeModal();

  // Small delay for smooth transition
  setTimeout(() => {
    openModal('success-modal');
  }, 300);
};

/**
 * Opens newsletter success modal after subscription
 */
export const openNewsletterSuccessModal = () => {
  openModal('newsletter-success-modal');
};

/**
 * Initializes modal functionality
 * Sets up event listeners for modal triggers and close buttons
 */
export const initModals = () => {
  // Find all modal trigger buttons (data-modal-trigger attribute or js-open-modal class)
  const modalTriggers = document.querySelectorAll('[data-modal-trigger], .js-open-modal');

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      // Open contact modal by default
      openModal('contact-modal');
    });
  });

  // Close buttons (.modal__close, .js-close-modal)
  const closeButtons = document.querySelectorAll('.modal__close, .js-close-modal, .modal-success__close, .js-close-success');

  closeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      closeModal();
    });
  });

  // Overlay click (close modal)
  const overlays = document.querySelectorAll('.modal__overlay, .modal-success__overlay');

  overlays.forEach((overlay) => {
    overlay.addEventListener('click', () => {
      closeModal();
    });
  });

  // ESC key (close modal)
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && activeModal) {
      closeModal();
    }
  });

  console.log('✅ Modals initialized');
};
