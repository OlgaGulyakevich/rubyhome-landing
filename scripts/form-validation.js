/**
 * Form validation module
 * Handles validation and submission of contact and newsletter forms
 * Features: Email validation, phone validation, required fields, checkbox validation
 */

import { openSuccessModal, openNewsletterSuccessModal } from './modal.js';

/**
 * Validates an email address format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid, false otherwise
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validates a phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if phone is valid, false otherwise
 */
export const validatePhone = (phone) => {
  // Accepts: +1234567890, 123-456-7890, (123) 456-7890, etc.
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone.trim());
};

/**
 * Validates a name field (min 2 characters)
 * @param {string} name - Name to validate
 * @returns {boolean} True if name is valid, false otherwise
 */
export const validateName = (name) => {
  return name.trim().length >= 2;
};

/**
 * Shows error message for a field
 * @param {HTMLElement} field - Input field element
 * @param {string} message - Error message to display
 */
const showError = (field, message) => {
  // Remove existing error
  clearError(field);

  // Add error class
  field.classList.add('modal__input--error');

  // Create error message element
  const errorElement = document.createElement('span');
  errorElement.className = 'modal__error';
  errorElement.textContent = message;
  errorElement.setAttribute('role', 'alert');

  // Insert after the field
  field.parentNode.insertBefore(errorElement, field.nextSibling);
};

/**
 * Clears error message for a field
 * @param {HTMLElement} field - Input field element
 */
const clearError = (field) => {
  field.classList.remove('modal__input--error');

  const errorElement = field.parentNode.querySelector('.modal__error');
  if (errorElement) {
    errorElement.remove();
  }
};

/**
 * Validates the contact form in modal
 * @param {HTMLFormElement} form - Form element to validate
 * @returns {boolean} True if form is valid, false otherwise
 */
export const validateContactForm = (form) => {
  let isValid = true;

  // Get form fields
  const nameField = form.querySelector('[name="name"]');
  const phoneField = form.querySelector('[name="phone"]');
  const emailField = form.querySelector('[name="email"]');
  const privacyCheckbox = form.querySelector('[name="privacy"]');
  const typeRadio = form.querySelector('[name="type"]:checked');

  // Validate name
  if (nameField) {
    if (!validateName(nameField.value)) {
      showError(nameField, 'Please enter a valid name (at least 2 characters)');
      isValid = false;
    } else {
      clearError(nameField);
    }
  }

  // Validate phone
  if (phoneField) {
    if (!validatePhone(phoneField.value)) {
      showError(phoneField, 'Please enter a valid phone number');
      isValid = false;
    } else {
      clearError(phoneField);
    }
  }

  // Validate email
  if (emailField) {
    if (!validateEmail(emailField.value)) {
      showError(emailField, 'Please enter a valid email address');
      isValid = false;
    } else {
      clearError(emailField);
    }
  }

  // Validate type selection
  if (!typeRadio) {
    // Show error near radio group
    const radioGroup = form.querySelector('.modal__radio-group');
    if (radioGroup) {
      const existingError = radioGroup.parentNode.querySelector('.modal__error');
      if (!existingError) {
        const errorElement = document.createElement('span');
        errorElement.className = 'modal__error';
        errorElement.textContent = 'Please select an option';
        errorElement.setAttribute('role', 'alert');
        radioGroup.parentNode.appendChild(errorElement);
      }
    }
    isValid = false;
  } else {
    // Clear radio error
    const radioGroup = form.querySelector('.modal__radio-group');
    if (radioGroup) {
      const errorElement = radioGroup.parentNode.querySelector('.modal__error');
      if (errorElement) {
        errorElement.remove();
      }
    }
  }

  // Validate privacy checkbox
  if (privacyCheckbox && !privacyCheckbox.checked) {
    const checkboxLabel = privacyCheckbox.closest('.modal__checkbox-label');
    if (checkboxLabel) {
      checkboxLabel.style.color = '#BF3448';
    }
    isValid = false;
  } else if (privacyCheckbox) {
    const checkboxLabel = privacyCheckbox.closest('.modal__checkbox-label');
    if (checkboxLabel) {
      checkboxLabel.style.color = '';
    }
  }

  return isValid;
};

/**
 * Validates the CTA newsletter form
 * @param {HTMLFormElement} form - Form element to validate
 * @returns {boolean} True if form is valid, false otherwise
 */
export const validateNewsletterForm = (form) => {
  const emailField = form.querySelector('[type="email"]');

  if (!emailField) return false;

  if (!validateEmail(emailField.value)) {
    showError(emailField, 'Please enter a valid email address');
    return false;
  }

  clearError(emailField);
  return true;
};

/**
 * Handles contact form submission
 * @param {HTMLFormElement} form - Form element
 */
const handleContactFormSubmit = (form) => {
  if (!validateContactForm(form)) {
    return;
  }

  // Collect form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  console.log('📋 Contact form data:', data);

  // TODO: Send data to backend
  // For now, just show success modal

  // Reset form
  form.reset();

  // Show success modal
  openSuccessModal();
};

/**
 * Handles newsletter form submission
 * @param {HTMLFormElement} form - Form element
 */
const handleNewsletterFormSubmit = (form) => {
  if (!validateNewsletterForm(form)) {
    return;
  }

  // Collect form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  console.log('📧 Newsletter subscription:', data);

  // TODO: Send data to backend
  // For now, just show success modal

  // Reset form
  form.reset();

  // Show newsletter success modal
  openNewsletterSuccessModal();
};

/**
 * Initializes form validation for all forms
 */
export const initFormValidation = () => {
  // Contact form (in modal)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      handleContactFormSubmit(contactForm);
    });
  }

  // Newsletter form (CTA section)
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      handleNewsletterFormSubmit(newsletterForm);
    });
  }

  // Real-time validation on input
  const allInputs = document.querySelectorAll('.modal__input, .cta__input');
  allInputs.forEach((input) => {
    input.addEventListener('blur', () => {
      // Validate on blur
      if (input.value.trim()) {
        if (input.type === 'email') {
          if (!validateEmail(input.value)) {
            showError(input, 'Please enter a valid email address');
          } else {
            clearError(input);
          }
        } else if (input.type === 'tel') {
          if (!validatePhone(input.value)) {
            showError(input, 'Please enter a valid phone number');
          } else {
            clearError(input);
          }
        } else if (input.name === 'name') {
          if (!validateName(input.value)) {
            showError(input, 'Please enter a valid name (at least 2 characters)');
          } else {
            clearError(input);
          }
        }
      }
    });

    input.addEventListener('input', () => {
      // Clear error on input
      clearError(input);
    });
  });

  console.log('✅ Form validation initialized');
};

