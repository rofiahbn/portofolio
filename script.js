/**
 * PORTFOLIO — RIZKY ADITYA PRATAMA
 * script.js — Interactive Features
 * Clean, well-commented vanilla JS
 */

/* ============================================
   1. LOADING SCREEN
   ============================================ */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  // Give loader a brief moment to show, then fade out
  setTimeout(() => {
    loader.classList.add('hidden');
    // Trigger initial reveal animations after loader
    document.body.style.overflow = '';
    revealOnScroll();
    startHeroAnimations();
  }, 2200);
  // Prevent scroll during load
  document.body.style.overflow = 'hidden';
});


/* ============================================
   2. NAVBAR — Sticky + Active Section Highlight
   ============================================ */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Add scrolled class for glassmorphism effect
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link based on current section
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

  // Back to Top button visibility
  const backToTop = document.getElementById('backToTop');
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // Skill bars animation on scroll
  animateSkillBars();

  // Animated counters trigger
  animateCounters();

  // Reveal elements on scroll
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

// Close menu when a link is clicked
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

// Smooth scroll for all anchor links
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

// Back to top
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ============================================
   5. DARK / LIGHT MODE TOGGLE
   ============================================ */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Load saved preference
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
   ============================================ */
const typingEl = document.getElementById('typingText');
const typingStrings = [
  'Data Analyst',
  'Project Manager',
  'Data Science Enthusiast',
  'Problem Solver',
  'Storyteller with Data'
];

let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

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
      // Pause at full word
      isDeleting = true;
      typingTimeout = setTimeout(typeWriter, 2000);
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
  typingTimeout = setTimeout(typeWriter, speed);
}


/* ============================================
   7. SCROLL REVEAL ANIMATION
   ============================================ */
function revealOnScroll() {
  const revealEls = document.querySelectorAll('.reveal');
  const windowH = window.innerHeight;

  revealEls.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowH - 60) {
      // Stagger delay for grouped elements
      const delay = el.dataset.delay || 0;
      setTimeout(() => {
        el.classList.add('visible');
      }, delay);
    }
  });
}

// Add stagger delays to children groups
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
   9. ANIMATED COUNTERS (Stats)
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
      const increment = target / 30;
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
   ============================================ */
const projectData = {
  ml: {
    title: 'Nutritional Status Classification',
    subtitle: 'Machine Learning · Python · Streamlit',
    desc: `Built an end-to-end machine learning pipeline to classify children's nutritional status (stunting, wasting, normal, and overweight) using WHO-standard anthropometric indicators — height, weight, age, and sex.

The model was trained on a dataset of 8,000+ children across East Java. After extensive feature engineering and model comparison (Logistic Regression, Decision Tree, Random Forest, XGBoost), the final Random Forest model achieved 94.2% accuracy on the test set.

The project was deployed as an interactive Streamlit web app and presented to health workers at a local Puskesmas for pilot testing.`,
    highlights: [
      '94.2% accuracy with Random Forest classifier',
      'Processed 8,000+ pediatric records from POSYANDU data',
      'Built interactive Streamlit dashboard for non-technical users',
      'Presented to health workers — received adoption approval',
      'Feature importance visualization using SHAP values'
    ],
    tools: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'SHAP', 'Streamlit', 'Matplotlib']
  },
  iot: {
    title: 'Gas Leakage Detection IoT System',
    subtitle: 'IoT · ESP8266 · Firebase',
    desc: `Designed and implemented a real-time gas leakage detection system for household safety. The system uses MQ-2 gas sensors connected to an ESP8266 NodeMCU microcontroller, which transmits readings to Firebase Realtime Database every 2 seconds.

A Python-based monitoring dashboard visualizes live sensor data, and automated SMS alerts via Twilio API notify registered users when gas concentrations exceed safe thresholds. The project won 2nd place at the campus IoT Hackathon 2023.`,
    highlights: [
      'Real-time gas concentration monitoring (2s refresh)',
      'Automated SMS alerts via Twilio API integration',
      'Firebase Realtime Database for cloud data storage',
      'Custom Python dashboard with live data charts',
      '2nd place — Campus IoT Hackathon 2023'
    ],
    tools: ['Arduino C++', 'ESP8266', 'MQ-2 Sensor', 'Firebase', 'Python', 'Twilio API', 'Matplotlib']
  },
  uiux: {
    title: 'Waste Management App UI/UX',
    subtitle: 'UI/UX Design · Figma · User Research',
    desc: `Led the complete UX design process for a smart waste management mobile application aimed at helping urban residents separate, schedule pickups, and earn rewards for proper waste disposal.

The process included 15+ user interviews, persona development, competitive analysis, journey mapping, and 3 rounds of usability testing. The final prototype achieved an 87% task completion rate and a System Usability Scale (SUS) score of 81 — above industry benchmark.`,
    highlights: [
      '15+ in-depth user interviews and survey analysis',
      'Complete user persona and journey map documentation',
      '3 rounds of usability testing with real users',
      'SUS score of 81 — "Excellent" benchmark',
      '87% task completion rate on key user flows'
    ],
    tools: ['Figma', 'Miro', 'FigJam', 'Maze (usability testing)', 'Notion', 'Adobe Illustrator']
  },
  dashboard: {
    title: 'Sales Analysis Dashboard',
    subtitle: 'Data Analytics · Power BI · SQL',
    desc: `Built an end-to-end sales analytics solution for a mid-sized retail company with 12 branch locations across Java. The project involved extracting, cleaning, and transforming 500,000+ transactional records using SQL and Python, then building an interactive Power BI dashboard for management use.

Key insights uncovered included seasonal revenue patterns, underperforming product categories, and high-churn customer segments. The dashboard reduced weekly reporting time from 6 hours to under 30 minutes.`,
    highlights: [
      'Processed 500K+ transactions from 12 branches',
      'Reduced manual reporting time by 83% (6hrs → 30min)',
      '20% improvement in reporting efficiency reported by management',
      'Identified 3 key revenue-driving product segments',
      'Integrated with live SQL database for auto-refresh'
    ],
    tools: ['Power BI', 'SQL (PostgreSQL)', 'Python', 'Pandas', 'Excel', 'DAX', 'Power Query']
  }
};

function openModal(key) {
  const data = projectData[key];
  if (!data) return;

  const highlightsHTML = data.highlights
    .map(h => `<div class="modal-highlight"><i class="fas fa-check-circle"></i><span>${h}</span></div>`)
    .join('');

  const toolsHTML = data.tools
    .map(t => `<span>${t}</span>`)
    .join('');

  // Split description by double newline for paragraphs
  const descHTML = data.desc
    .split('\n\n')
    .map(p => `<p class="modal-desc">${p.trim()}</p>`)
    .join('');

  document.getElementById('modalContent').innerHTML = `
    <h2 class="modal-title">${data.title}</h2>
    <p class="modal-subtitle">${data.subtitle}</p>
    ${descHTML}
    <h4 style="font-family:var(--font-heading);font-size:.85rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:.75rem;">Key Highlights</h4>
    <div class="modal-highlights">${highlightsHTML}</div>
    <h4 style="font-family:var(--font-heading);font-size:.85rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:.75rem;margin-top:1.25rem;">Tools & Technologies</h4>
    <div class="modal-tools">${toolsHTML}</div>
  `;

  document.getElementById('projectModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(event) {
  // Only close if clicking the overlay itself (not the box)
  if (event.target === document.getElementById('projectModal')) {
    closeModalDirect();
  }
}

function closeModalDirect() {
  document.getElementById('projectModal').classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModalDirect();
});


/* ============================================
   11. CONTACT FORM
   ============================================ */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-send');
  const success = document.getElementById('formSuccess');

  // Simple loading state
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  // Simulate API call (replace with actual form service like Formspree/EmailJS)
  setTimeout(() => {
    btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
    btn.disabled = false;
    success.style.display = 'flex';
    e.target.reset();
    // Hide success after 5 seconds
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  }, 1800);
}


/* ============================================
   12. MICRO INTERACTIONS
   ============================================ */

// Nav link hover ripple feel (via CSS ::after already, but add JS tracking)
navLinks.forEach(link => {
  link.addEventListener('mouseenter', function() {
    this.style.setProperty('--hover-x', '50%');
  });
});

// Tech card tilt effect on desktop hover
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

// Smooth active state on project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousedown', function() {
    this.style.transform = 'translateY(-3px) scale(0.99)';
  });
  card.addEventListener('mouseup', function() {
    this.style.transform = '';
  });
});


/* ============================================
   13. SCROLL PROGRESS (Optional visual touch)
   ============================================ */
// Creates a thin gold progress bar at top of page
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
  // Initial call for elements in viewport on load
  setTimeout(() => {
    revealOnScroll();
    animateCounters();
  }, 2400); // after loader fades
});
