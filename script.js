/* ============================================================
   Flávia D. Silva Portfolio — JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ──────────────── NAVBAR SCROLL ────────────────
  const navbar = document.getElementById('navbar');

  const handleNavbarScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll);

  // ──────────────── MOBILE MENU ────────────────
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ──────────────── ACTIVE NAV LINK ON SCROLL ────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinkElements = document.querySelectorAll('.nav-link');

  const highlightNavLink = () => {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinkElements.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavLink);

  // ──────────────── SCROLL ANIMATIONS (Intersection Observer) ────────────────
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));

  // ──────────────── COUNTER ANIMATION ────────────────
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const startTime = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const current = Math.round(easedProgress * target);

      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  // ──────────────── SMOOTH SCROLL (fallback) ────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ──────────────── PARALLAX ORB EFFECT ────────────────
  const orbs = document.querySelectorAll('.hero-orb');
  let ticking = false;

  const updateParallax = () => {
    const scrollY = window.scrollY;
    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.15;
      orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  // ──────────────── CURSOR GLOW (Desktop only) ────────────────
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursorGlow = document.createElement('div');
    cursorGlow.classList.add('cursor-glow');
    document.body.appendChild(cursorGlow);

    // Add cursor glow styles dynamically
    const style = document.createElement('style');
    style.textContent = `
      .cursor-glow {
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(124, 58, 237, 0.06), transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        opacity: 0;
      }
      .cursor-glow.active {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorGlow.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
      cursorGlow.classList.remove('active');
    });

    const animateGlow = () => {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
      requestAnimationFrame(animateGlow);
    };

    animateGlow();
  }

  // ──────────────── TYPING / YEAR UPDATE ────────────────
  const yearEls = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = currentYear);

});
