// script.js

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('navbar-menu');
  // Hide menu by default on mobile
  function closeMenu() {
    navMenu.classList.add('-translate-y-full', 'invisible', 'opacity-0', 'pointer-events-none');
    navMenu.classList.remove('translate-y-0', 'visible', 'opacity-100', 'pointer-events-auto');
    navToggle.setAttribute('aria-expanded', 'false');
  }
  function openMenu() {
    navMenu.classList.remove('-translate-y-full', 'invisible', 'opacity-0', 'pointer-events-none');
    navMenu.classList.add('translate-y-0', 'visible', 'opacity-100', 'pointer-events-auto');
    navToggle.setAttribute('aria-expanded', 'true');
  }
  closeMenu();
  navToggle.addEventListener('click', function () {
    if (navMenu.classList.contains('opacity-0')) {
      openMenu();
    } else {
      closeMenu();
    }
  });
  // Close nav menu on click (mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) closeMenu();
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Fade-in on scroll
  const fadeEls = document.querySelectorAll('.fade-in');
  const fadeInOpts = {
    threshold: 0.1
  };
  const fadeInOnScroll = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        obs.unobserve(entry.target);
      }
    });
  }, fadeInOpts);
  fadeEls.forEach(el => {
    fadeInOnScroll.observe(el);
  });

  // Contact form validation
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const errorMessage = document.getElementById('error-message');
  const successMessage = document.getElementById('success-message');

  // Utility: validate email
  function validateEmail(email) {
    // Basic email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // On form submit
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Name
    if (nameInput.value.trim().length < 2) {
      errorName.textContent = "Please enter your name.";
      errorName.classList.remove('hidden');
      valid = false;
    } else {
      errorName.classList.add('hidden');
    }

    // Email
    if (!validateEmail(emailInput.value.trim())) {
      errorEmail.textContent = "Please enter a valid email address.";
      errorEmail.classList.remove('hidden');
      valid = false;
    } else {
      errorEmail.classList.add('hidden');
    }

    // Message
    if (messageInput.value.trim().length < 5) {
      errorMessage.textContent = "Please enter your message.";
      errorMessage.classList.remove('hidden');
      valid = false;
    } else {
      errorMessage.classList.add('hidden');
    }

    if (valid) {
      form.reset();
      [errorName, errorEmail, errorMessage].forEach(e => e.classList.add('hidden'));
      successMessage.classList.remove('hidden');
      setTimeout(() => { successMessage.classList.add('hidden'); }, 4000);
    }
  });
});


// Fade-in Animation (Tailwind custom utility using @layer not possible via CDN, so use inline style)
const style = document.createElement('style');
style.innerHTML = `
@media (prefers-reduced-motion: no-preference) {
  .animate-fade-in {
    animation: fadein 1.1s 0.05s both;
  }
  @keyframes fadein {
    from { opacity: 0; transform: translateY(40px) scale(0.98);}
    to   { opacity: 1; transform: none;}
  }
}
`;
document.head.appendChild(style);