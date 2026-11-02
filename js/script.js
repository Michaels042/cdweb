/**
 * CD'S LANDMARK PROPERTIES - JAVASCRIPT LOGIC
 * Brand Tagline: "FROM LAND TO LANDMARK"
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. MOBILE NAVIGATION TOGGLE
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const header = document.querySelector('.main-header');

  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      mobileNavToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
      document.body.style.overflow = isOpen ? '' : 'hidden';
      mobileNavToggle.setAttribute('aria-expanded', !isOpen);
    });

    // Close menu when clicking any nav link
    const navLinks = navMenu.querySelectorAll('.nav-link, .btn');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavToggle.classList.remove('open');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
        mobileNavToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && 
          !navMenu.contains(e.target) && 
          !mobileNavToggle.contains(e.target)) {
        mobileNavToggle.classList.remove('open');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
        mobileNavToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2. STICKY NAVBAR SCROLL ELEVATION
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 3. BACK TO TOP BUTTON
  const backToTopBtn = document.querySelector('.btn-back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. ACTIVE PAGE LINK HIGHLIGHT
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-link');
  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 5. INTERACTIVE WORKFLOW TABS (SERVICES PAGE)
  const tabButtons = document.querySelectorAll('.workflow-tab-btn');
  const tabContents = document.querySelectorAll('.workflow-tab-content');

  if (tabButtons.length > 0 && tabContents.length > 0) {
    function switchTab(targetId) {
      tabButtons.forEach(btn => {
        if (btn.getAttribute('data-target') === targetId) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      tabContents.forEach(content => {
        if (content.id === targetId) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    }

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        switchTab(targetId);
      });
    });

    // Check for URL hash (e.g., services.html#construction)
    if (window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      const matchingBtn = document.querySelector(`.workflow-tab-btn[data-target="${hashId}"]`);
      if (matchingBtn) {
        switchTab(hashId);
        setTimeout(() => {
          matchingBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 150);
      }
    }
  }

  // 6. FAQ ACCORDION LOGIC
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const headerEl = item.querySelector('.faq-header');
    const bodyEl = item.querySelector('.faq-body');

    if (headerEl && bodyEl) {
      headerEl.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Optional: close other items for clean single accordion
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBody = otherItem.querySelector('.faq-body');
            if (otherBody) otherBody.style.maxHeight = null;
          }
        });

        if (isActive) {
          item.classList.remove('active');
          bodyEl.style.maxHeight = null;
        } else {
          item.classList.add('active');
          bodyEl.style.maxHeight = bodyEl.scrollHeight + 'px';
        }
      });
    }
  });

  // 7. CONTACT FORM VALIDATION & INTERACTION
  const contactForm = document.getElementById('cdLandmarkContactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('fullname');
      const emailInput = document.getElementById('email');
      const phoneInput = document.getElementById('phone');
      const serviceSelect = document.getElementById('service');
      const messageInput = document.getElementById('message');

      let isValid = true;
      let errorMessages = [];

      // Validation
      if (!nameInput.value.trim()) {
        isValid = false;
        errorMessages.push('Please enter your full name.');
        nameInput.style.borderColor = '#d94b4b';
      } else {
        nameInput.style.borderColor = '';
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        isValid = false;
        errorMessages.push('Please enter a valid email address.');
        emailInput.style.borderColor = '#d94b4b';
      } else {
        emailInput.style.borderColor = '';
      }

      if (!phoneInput.value.trim() || phoneInput.value.trim().length < 9) {
        isValid = false;
        errorMessages.push('Please enter a valid phone or WhatsApp number.');
        phoneInput.style.borderColor = '#d94b4b';
      } else {
        phoneInput.style.borderColor = '';
      }

      if (!serviceSelect.value) {
        isValid = false;
        errorMessages.push('Please select a service interest.');
        serviceSelect.style.borderColor = '#d94b4b';
      } else {
        serviceSelect.style.borderColor = '';
      }

      if (!messageInput.value.trim()) {
        isValid = false;
        errorMessages.push('Please provide brief details about your inquiry.');
        messageInput.style.borderColor = '#d94b4b';
      } else {
        messageInput.style.borderColor = '';
      }

      if (formFeedback) {
        if (!isValid) {
          formFeedback.className = 'form-feedback error';
          formFeedback.innerHTML = `<strong>Please correct the following:</strong><br>${errorMessages.join('<br>')}`;
          formFeedback.style.display = 'block';
          formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          // Success Feedback
          const submitBtn = contactForm.querySelector('button[type="submit"]');
          const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';
          
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Submitting inquiry...';
          }

          setTimeout(() => {
            formFeedback.className = 'form-feedback success';
            formFeedback.innerHTML = `<strong>Thank You, ${nameInput.value.trim()}!</strong><br>Your inquiry regarding <em>${serviceSelect.value}</em> has been received. Our property consultants in Enugu will get in touch with you shortly.`;
            formFeedback.style.display = 'block';

            // Optional direct WhatsApp handover prompt
            const whatsappPrompt = document.createElement('div');
            whatsappPrompt.style.marginTop = '14px';
            const encodedMsg = encodeURIComponent(
              `Hello CD's Landmark Properties,\nMy name is ${nameInput.value.trim()}.\nI am inquiring about: ${serviceSelect.value}.\nDetails: ${messageInput.value.trim()}`
            );
            whatsappPrompt.innerHTML = `
              <a href="https://wa.me/2348108871578?text=${encodedMsg}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-gold" style="margin-top: 8px;">
                Chat Directly on WhatsApp &rarr;
              </a>
            `;
            formFeedback.appendChild(whatsappPrompt);

            contactForm.reset();
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalText;
            }
          }, 600);
        }
      }
    });
  }

  // 8. STATS COUNTER ANIMATION WITH INTERSECTION OBSERVER
  const statNumbers = document.querySelectorAll('.stat-number');
  if ('IntersectionObserver' in window && statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetValue = parseInt(target.getAttribute('data-count') || '0', 10);
          const suffix = target.getAttribute('data-suffix') || '';
          let count = 0;
          const stepTime = Math.max(10, Math.floor(1500 / (targetValue || 1)));

          const counterInterval = setInterval(() => {
            count += Math.ceil(targetValue / 40);
            if (count >= targetValue) {
              target.textContent = targetValue + suffix;
              clearInterval(counterInterval);
            } else {
              target.textContent = count + suffix;
            }
          }, stepTime);

          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => statsObserver.observe(num));
  }
});
