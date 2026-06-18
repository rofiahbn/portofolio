/**
 * PORTFOLIO — ROFI'AH BUDI NADIA
 * script.js — Interactive Features
 * Updated to match CV & HTML (June 2026)
 */

/* ============================================
   1. LOADING SCREEN
   ============================================ */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    revealOnScroll();
    startHeroAnimations();
  }, 2200);
  document.body.style.overflow = 'hidden';
});


/* ============================================
   2. NAVBAR — Sticky + Active Section Highlight
   ============================================ */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });

  const backToTop = document.getElementById('backToTop');
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  animateSkillBars();
  animateCounters();
  revealOnScroll();
});


/* ============================================
   3. HAMBURGER MENU (Mobile)
   ============================================ */
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksMenu.classList.toggle('open');
});

navLinksMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksMenu.classList.remove('open');
  });
});


/* ============================================
   4. SMOOTH SCROLL
   ============================================ */
function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    const offset = target.offsetTop - parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '72'
    );
    window.scrollTo({ top: offset, behavior: 'smooth' });
  }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navH = document.getElementById('navbar').offsetHeight;
      const targetPos = target.offsetTop - navH;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ============================================
   5. DARK / LIGHT MODE TOGGLE
   ============================================ */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = body.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('portfolio-theme', next);
});

function applyTheme(theme) {
  body.setAttribute('data-theme', theme);
  if (theme === 'light') {
    body.classList.remove('dark-mode');
    themeIcon.className = 'fas fa-moon';
  } else {
    body.classList.add('dark-mode');
    themeIcon.className = 'fas fa-sun';
  }
}


/* ============================================
   6. TYPING ANIMATION (Hero)
   — Updated to reflect Rofi'ah's actual roles
   ============================================ */
const typingEl = document.getElementById('typingText');
const typingStrings = [
  'data-driven solutions',      // Data Analyst focus (Hacktiv8 bootcamp)
  'full-stack web systems',     // GoAR Global experience
  'machine learning models',    // IEEE paper + Neurontara 1st place
  'database architectures',     // ERD & schema design background
  'stories from data'           // Analyst storytelling angle
];

let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;

function startHeroAnimations() {
  typeWriter();
}

function typeWriter() {
  const current = typingStrings[typeIndex];
  const displayed = isDeleting
    ? current.substring(0, charIndex - 1)
    : current.substring(0, charIndex + 1);

  typingEl.textContent = displayed;

  if (!isDeleting) {
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeWriter, 2000);
      return;
    }
  } else {
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      typeIndex = (typeIndex + 1) % typingStrings.length;
    }
  }

  const speed = isDeleting ? 60 : 100;
  setTimeout(typeWriter, speed);
}


/* ============================================
   7. SCROLL REVEAL ANIMATION
   ============================================ */
function revealOnScroll() {
  const revealEls = document.querySelectorAll('.reveal');
  const windowH = window.innerHeight;

  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowH - 60) {
      const delay = el.dataset.delay || 0;
      setTimeout(() => {
        el.classList.add('visible');
      }, delay);
    }
  });
}

function setupRevealDelays() {
  const groups = [
    '.strength-cards .strength-card',
    '.tech-grid .tech-card',
    '.cert-grid .cert-card',
    '.projects-grid .project-card',
    '.soft-skills .soft-tag'
  ];
  groups.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.dataset.delay = i * 80;
    });
  });
}
setupRevealDelays();


/* ============================================
   8. ANIMATED SKILL BARS
   ============================================ */
let skillsAnimated = false;

function animateSkillBars() {
  if (skillsAnimated) return;
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    document.querySelectorAll('.skill-fill').forEach(bar => {
      const targetWidth = bar.getAttribute('data-width');
      bar.style.width = targetWidth + '%';
    });
    skillsAnimated = true;
  }
}


/* ============================================
   9. ANIMATED COUNTERS (Hero Stats)
   — Synced with HTML: 1+ Years Exp, 6+ Awards, 1 IEEE Paper
   ============================================ */
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;
  const statsSection = document.querySelector('.hero-stats');
  if (!statsSection) return;

  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    document.querySelectorAll('.stat-number[data-count]').forEach(el => {
      const target = parseInt(el.getAttribute('data-count'));
      let current = 0;
      const increment = Math.max(target / 30, 1);
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current);
      }, 50);
    });
    countersStarted = true;
  }
}


/* ============================================
   10. PROJECT MODAL
   — Modal close handlers kept in case modal is used later.
     To add modal to a project card, use onclick="openModal()"
     and define the content inside that function.
   ============================================ */
function closeModal(event) {
  if (event.target === document.getElementById('projectModal')) {
    closeModalDirect();
  }
}

function closeModalDirect() {
  document.getElementById('projectModal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModalDirect();
});


/* ============================================
   11. CONTACT FORM
   ============================================ */
function handleFormSubmit(e) {
  const btn = e.target.querySelector('.btn-send');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;
}


/* ============================================
   12. MICRO INTERACTIONS
   ============================================ */
navLinks.forEach(link => {
  link.addEventListener('mouseenter', function() {
    this.style.setProperty('--hover-x', '50%');
  });
});

// Tilt effect on tech & cert cards
document.querySelectorAll('.tech-card, .cert-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    this.style.transform = `perspective(400px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// Press effect on project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousedown', function() {
    this.style.transform = 'translateY(-3px) scale(0.99)';
  });
  card.addEventListener('mouseup', function() {
    this.style.transform = '';
  });
});


/* ============================================
   13. SCROLL PROGRESS BAR
   ============================================ */
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed; top: 0; left: 0; z-index: 1001;
  height: 2px;
  background: linear-gradient(90deg, #c8a55a, #e0c07a);
  width: 0%;
  transition: width 0.1s linear;
  pointer-events: none;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrolled / total) * 100;
  progressBar.style.width = progress + '%';
});


/* ============================================
   14. INIT ON DOM READY
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    revealOnScroll();
    animateCounters();
  }, 2400);
});