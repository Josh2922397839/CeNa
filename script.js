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
    surveyForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Intercept native POST submission

      const checkboxNames = ['favorite_desserts', 'unique_desserts', 'favorite_drinks', 'buying_priorities', 'atmosphere'];

      checkboxNames.forEach(name => {
        // Find all selected checkboxes in this category
        const checkedBoxes = Array.from(surveyForm.querySelectorAll(`input[name="${name}"]:checked`));
        
        // Comma-join their values
        const joinedValue = checkedBoxes.map(cb => cb.value).join(', ');

        // Create or find hidden input
        let hiddenInput = surveyForm.querySelector(`input[type="hidden"][name="${name}"]`);
        if (!hiddenInput) {
          hiddenInput = document.createElement('input');
          hiddenInput.type = 'hidden';
          hiddenInput.name = name;
          surveyForm.appendChild(hiddenInput);
        }
        hiddenInput.value = joinedValue || 'None';

        // Temporarily disable the original checkboxes so they aren't submitted individually in the FormData payload
        const allBoxes = surveyForm.querySelectorAll(`input[name="${name}"]`);
        allBoxes.forEach(cb => {
          cb.disabled = true;
        });
      });

      const formData = new FormData(surveyForm);

      // Re-enable checkboxes immediately so UI is interactable
      surveyForm.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.disabled = false;
      });

      // Show sending state
      const submitBtn = surveyForm.querySelector('.survey-submit-btn');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending... ✨';
      submitBtn.disabled = true;

      // Prepare controller for 4-second timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      try {
        const response = await fetch(surveyForm.action, {
          method: 'POST',
          body: formData,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          // Success: show thank you section and reset form
          const thanksEl = document.querySelector('.survey-thanks');
          if (thanksEl) thanksEl.style.display = 'block';
          surveyForm.reset();
          
          // Scroll to thanks message
          thanksEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          throw new Error('Server error');
        }
      } catch (err) {
        clearTimeout(timeoutId);
        console.warn('Primary submission server offline. Triggering fallback email client:', err);
        showBackupModal(formData);
      } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }

  // ---- Backup Modal Function ----
  function showBackupModal(formData) {
    let emailBody = "Hello CeNa Pastry team!\n\n(This is a backup email survey submission because the main survey submission server was temporarily down)\n\nHere are my survey answers:\n\n";
    
    for (let [key, value] of formData.entries()) {
      if (key.startsWith('_')) continue;
      
      const formattedKey = key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
        
      emailBody += `♥ ${formattedKey}: ${value}\n`;
    }
    
    emailBody += "\nThank you for creating delicious pastries! ♥\n";

    const recipient = "cenapastries@gmail.com";
    const subject = encodeURIComponent("CeNa Pastry - Survey Response (Backup)");
    const body = encodeURIComponent(emailBody);
    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

    // Add styles
    const hoverStyle = document.createElement('style');
    hoverStyle.id = 'backup-hover-style';
    hoverStyle.innerHTML = `
      #backup-send-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 24px rgba(139, 26, 26, 0.35) !important;
        background: linear-gradient(135deg, #A62B2B, #C23B3B) !important;
      }
      #backup-close-btn:hover {
        color: #A62B2B !important;
      }
    `;
    document.head.appendChild(hoverStyle);

    // Create Modal
    const modal = document.createElement('div');
    modal.id = 'backup-modal';
    modal.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(61, 21, 21, 0.4);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      background: #FDF9F5;
      border: 3px dashed #D4A017;
      border-radius: 20px;
      padding: 35px 25px;
      max-width: 450px;
      width: 90%;
      box-shadow: 0 20px 50px rgba(61, 21, 21, 0.25);
      text-align: center;
      position: relative;
      transform: translateY(20px);
      transition: transform 0.3s ease;
    `;

    modalContent.innerHTML = `
      <div style="width: 60px; height: 40px; margin: 0 auto 15px; opacity: 0.8;
        background-image: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 80' fill='none' stroke='%238B1A1A' stroke-width='2'%3E%3Cpath d='M60 40 C40 15 10 20 15 35 C20 50 50 45 60 40' /%3E%3Cpath d='M60 40 C80 15 110 20 105 35 C100 50 70 45 60 40' /%3E%3Cpath d='M55 40 Q50 55 45 70' /%3E%3Cpath d='M65 40 Q70 55 75 70' /%3E%3Ccircle cx='60' cy='40' r='4' fill='%238B1A1A' stroke='none'/%3E%3C/svg%3E&quot;);
        background-size: contain; background-repeat: no-repeat; background-position: center;">
      </div>
      
      <h3 style="font-family: 'Playfair Display', serif; color: #8B1A1A; font-size: 1.6rem; margin-bottom: 12px;">🌸 Server Offline Backup</h3>
      
      <p style="font-family: 'Inter', sans-serif; color: #5C4A42; font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">
        Our primary survey submission server is temporarily offline, but we still really want to hear from you! 
        We have compiled all your answers into an email. Please click below to send them directly to us.
      </p>
      
      <a href="${mailtoUrl}" id="backup-send-btn" style="
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 14px 28px;
        background: linear-gradient(135deg, #8B1A1A, #A62B2B);
        color: #FFFFFF;
        font-family: 'Inter', sans-serif;
        font-size: 0.9rem;
        font-weight: 600;
        border-radius: 30px;
        text-decoration: none;
        box-shadow: 0 8px 20px rgba(139, 26, 26, 0.25);
        transition: all 0.2s ease;
        margin-bottom: 16px;
      ">
        ✉️ Send via Email Client
      </a>
      
      <div style="font-size: 0.8rem; color: #8C7B72; font-style: italic; margin-bottom: 20px;">
        (Your email app will open with your answers pre-filled. Just hit send!)
      </div>
      
      <button id="backup-close-btn" style="
        background: none;
        border: none;
        color: #8B1A1A;
        font-family: 'Inter', sans-serif;
        font-size: 0.85rem;
        text-decoration: underline;
        cursor: pointer;
        font-weight: 500;
      ">
        Close & edit survey
      </button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    requestAnimationFrame(() => {
      modal.style.opacity = '1';
      modalContent.style.transform = 'translateY(0)';
    });

    const closeBtn = modal.querySelector('#backup-close-btn');
    const sendBtn = modal.querySelector('#backup-send-btn');

    const closeModal = () => {
      modal.style.opacity = '0';
      modalContent.style.transform = 'translateY(20px)';
      setTimeout(() => {
        modal.remove();
        const existingStyle = document.getElementById('backup-hover-style');
        if (existingStyle) existingStyle.remove();
      }, 300);
    };

    closeBtn.addEventListener('click', closeModal);
    sendBtn.addEventListener('click', () => {
      setTimeout(() => {
        closeModal();
        const thanksEl = document.querySelector('.survey-thanks');
        if (thanksEl) thanksEl.style.display = 'block';
        const surveyForm = document.querySelector('.survey-form');
        if (surveyForm) surveyForm.reset();
      }, 500);
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
