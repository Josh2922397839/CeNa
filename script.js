/* ============================================
   CeNa Pastry - Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- DOM Elements ----
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const navHamburger = document.getElementById('navHamburger');
  const navOverlay = document.getElementById('navOverlay');
  const backToTop = document.getElementById('backToTop');
  const allNavAnchors = navLinks.querySelectorAll('a');
  const sections = document.querySelectorAll('section[id]');

  // ---- Navbar Scroll Effect ----
  let lastScroll = 0;
  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Add/remove scrolled class
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    lastScroll = scrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ---- Mobile Menu Toggle ----
  const toggleMobileMenu = () => {
    navLinks.classList.toggle('open');
    navHamburger.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    navLinks.classList.remove('open');
    navHamburger.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  navHamburger.addEventListener('click', toggleMobileMenu);
  navOverlay.addEventListener('click', closeMobileMenu);

  // Close mobile menu on nav link click
  allNavAnchors.forEach(anchor => {
    anchor.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // ---- Active Nav Link on Scroll ----
  const updateActiveNav = () => {
    const scrollY = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        allNavAnchors.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---- Back to Top ----
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- Scroll Reveal Animation ----
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-up');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve - allow re-animations if desired
        // revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Parallax Effect on Hero ----
  const heroContent = document.querySelector('.hero-content');
  const heroIllusLeft = document.querySelector('.hero-illus-left');
  const heroIllusRight = document.querySelector('.hero-illus-right');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      const factor = scrollY * 0.3;
      if (heroContent) {
        heroContent.style.transform = `translateY(${factor * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrollY / (window.innerHeight * 0.8));
      }
      if (heroIllusLeft) {
        heroIllusLeft.style.transform = `translateY(calc(-50% + ${factor * 0.15}px)) rotate(-8deg)`;
      }
      if (heroIllusRight) {
        heroIllusRight.style.transform = `translateY(calc(-50% + ${factor * 0.15}px)) rotate(8deg)`;
      }
    }
  }, { passive: true });

  // ---- Floating Hearts / Pastry Particles ----
  const createFloatingHeart = () => {
    const heart = document.createElement('div');
    const symbols = ['♥', '🧁', '🎀', '✿', '♡', '🍰'];
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.cssText = `
      position: fixed;
      bottom: -30px;
      left: ${Math.random() * 100}vw;
      font-size: ${12 + Math.random() * 16}px;
      opacity: 0;
      pointer-events: none;
      z-index: 9999;
      animation: floatUp ${5 + Math.random() * 5}s ease-out forwards;
    `;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
  };

  // Add the floating animation keyframes dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatUp {
      0% {
        opacity: 0;
        transform: translateY(0) rotate(0deg);
      }
      20% {
        opacity: 0.6;
      }
      80% {
        opacity: 0.3;
      }
      100% {
        opacity: 0;
        transform: translateY(-100vh) rotate(${Math.random() > 0.5 ? '' : '-'}360deg);
      }
    }
  `;
  document.head.appendChild(style);

  // Spawn floating hearts periodically
  setInterval(createFloatingHeart, 4000);

  // ---- Feature Badge Hover Sound Effect (visual only) ----
  const badges = document.querySelectorAll('.feature-badge');
  badges.forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      badge.style.transform = 'scale(1.1)';
    });
    badge.addEventListener('mouseleave', () => {
      badge.style.transform = 'scale(1)';
    });
  });

  // ---- TOC Item Hover Enhancement ----
  const tocItems = document.querySelectorAll('.toc-item');
  tocItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.querySelector('.toc-number').style.transform = 'scale(1.15)';
    });
    item.addEventListener('mouseleave', () => {
      item.querySelector('.toc-number').style.transform = 'scale(1)';
    });
  });

  // ---- Keyboard Accessibility ----
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });

  // ---- Survey Checkbox Multiple Selection Sync ----
  const surveyForm = document.querySelector('.survey-form');
  if (surveyForm) {
    surveyForm.addEventListener('submit', () => {
      // List of all checkbox names we want to capture fully as comma-separated values
      const checkboxNames = ['favorite_desserts', 'unique_desserts', 'favorite_drinks', 'buying_priorities', 'atmosphere'];

      checkboxNames.forEach(name => {
        // Find all selected checkboxes in this category
        const checkedBoxes = Array.from(surveyForm.querySelectorAll(`input[name="${name}"]:checked`));
        
        // Comma-join their values
        const joinedValue = checkedBoxes.map(cb => cb.value).join(', ');

        // Create a hidden input with the category name and populated list
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = name;
        hiddenInput.value = joinedValue || 'None';

        // Remove the name attribute from the original checkboxes so they are not submitted individually
        const allBoxes = surveyForm.querySelectorAll(`input[name="${name}"]`);
        allBoxes.forEach(cb => {
          cb.removeAttribute('name');
        });

        surveyForm.appendChild(hiddenInput);
      });
    });
  }

  // ---- Initial state ----
  handleScroll();

  // ---- Preloader fade out (if page loads fast, minimal delay) ----
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });

  console.log('🧁 CeNa Pastry website loaded! Made with love ♥');
});
