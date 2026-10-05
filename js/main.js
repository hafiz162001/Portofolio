/**
 * Hafiz Achmad Ramdani - Professional Portfolio Interactive Script
 * Modern, accessible, fluid interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavbarScroll();
  initThemeToggle();
  initLanguageToggle();
  initMobileNav();
  initProjectFilters();
  initModals();
  initStatsCounter();
  initScrollSpy();
  initClipboardButtons();
  initTerminalRun();
  initBackToTop();
  initContactForm();
});

/* ==========================================================================
   Scroll Progress Bar
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });
}

/* ==========================================================================
   Navbar Shadow on Scroll
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
  });
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('theme-icon');
  if (!themeIcon) return;
  
  if (theme === 'light') {
    themeIcon.className = 'fas fa-moon';
    themeIcon.setAttribute('title', 'Switch to Dark Mode');
  } else {
    themeIcon.className = 'fas fa-sun';
    themeIcon.setAttribute('title', 'Switch to Light Mode');
  }
}

/* ==========================================================================
   Bilingual Toggle (EN / ID)
   ========================================================================== */
const TRANSLATIONS = {
  en: {
    heroPill: "Available for Technical Projects & Speaking",
    heroTitle: "Architecting <span class='gradient-text'>Public Tech</span> & Mentoring Future Engineers.",
    heroSubtitle: "Software Engineer and IT Educator with an Informatics background. Proven expertise in engineering municipal public portals, scaling educational ERP platforms, and building intelligent IoT solutions.",
    roleMunicipal: "Public Service Programmer @ Dishubkominfo",
    btnExplore: "Explore Projects",
    btnDownloadCV: "Download CV (Word)",
    btnPortfolioPdf: "Portfolio PDF",
    navAbout: "About",
    navExperience: "Experience",
    navProjects: "Projects",
    navSkills: "Skills",
    navCredentials: "Credentials",
    navSpeaking: "Speaking",
    navContact: "Contact",
    btnLetsTalk: "Let's Talk",
    copiedToast: "Copied to clipboard!",
  },
  id: {
    heroPill: "Terbuka untuk Kolaborasi Proyek & Pembicara",
    heroTitle: "Membangun <span class='gradient-text'>Teknologi Publik</span> & Membina Talenta Digital.",
    heroSubtitle: "Software Engineer dan Pendidik IT berlatar belakang Teknik Informatika. Berpengalaman merancang portal layanan publik daerah, mengembangkan platform ERP edukasi, serta solusi otomasi IoT cerdas.",
    roleMunicipal: "Programmer Aplikasi Publik @ Dishubkominfo",
    btnExplore: "Lihat Portofolio Proyek",
    btnDownloadCV: "Unduh CV Resmi (Word)",
    btnPortfolioPdf: "Dokumen PDF Portofolio",
    navAbout: "Tentang",
    navExperience: "Pengalaman",
    navProjects: "Proyek",
    navSkills: "Keahlian",
    navCredentials: "Sertifikasi & HAKI",
    navSpeaking: "Pemateri",
    navContact: "Kontak",
    btnLetsTalk: "Hubungi Saya",
    copiedToast: "Berhasil disalin ke papan klip!",
  }
};

function initLanguageToggle() {
  const langToggleBtn = document.getElementById('lang-toggle');
  if (!langToggleBtn) return;

  let currentLang = localStorage.getItem('lang') || 'en';
  applyLanguage(currentLang);

  langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'id' : 'en';
    localStorage.setItem('lang', currentLang);
    applyLanguage(currentLang);
    showToast(currentLang === 'id' ? 'Bahasa Indonesia diaktifkan' : 'Switched to English');
  });
}

function applyLanguage(lang) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const langLabel = document.getElementById('lang-label');
  if (langLabel) {
    langLabel.textContent = lang === 'en' ? 'ID' : 'EN';
  }

  // Translate mapped data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.innerHTML = t[key];
    }
  });
}

/* ==========================================================================
   Mobile Navigation Menu
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggleBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close when clicking any nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   Project Category Filter
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category.includes(filterVal)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 180);
        }
      });
    });
  });
}

/* ==========================================================================
   Modals (Certificates, HAKI & Project Details)
   ========================================================================== */
function initModals() {
  const modal = document.getElementById('cert-modal');
  if (!modal) return;

  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalClose = document.getElementById('modal-close');

  const openModal = (src, title, desc) => {
    if (src) {
      modalImg.src = src;
      modalImg.alt = title;
      modalImg.style.display = 'block';
    } else {
      modalImg.style.display = 'none';
    }
    modalTitle.textContent = title;
    modalDesc.innerHTML = desc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Triggers for certificates and project details
  document.querySelectorAll('[data-cert-target]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const src = trigger.getAttribute('data-cert-src');
      const title = trigger.getAttribute('data-cert-title');
      const desc = trigger.getAttribute('data-cert-desc');
      openModal(src, title, desc);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   Interactive Stats Counter
   ========================================================================== */
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-number');
  let animated = false;

  const runCounter = () => {
    stats.forEach(stat => {
      const target = stat.getAttribute('data-target');
      if (!target) return;

      const isDecimal = target.includes('.');
      const numTarget = parseFloat(target);
      let count = 0;
      const speed = 40;
      const increment = numTarget / speed;

      const updateCount = () => {
        count += increment;
        if (count < numTarget) {
          stat.textContent = isDecimal ? count.toFixed(2) : Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = stat.getAttribute('data-format') || target;
        }
      };

      updateCount();
    });
  };

  const strip = document.querySelector('.stats-strip');
  if (!strip) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        runCounter();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(strip);
}

/* ==========================================================================
   Copy to Clipboard & Toast
   ========================================================================== */
function initClipboardButtons() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied: "${textToCopy}"`);
      }).catch(() => {
        showToast('Failed to copy to clipboard');
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--accent-emerald);"></i> ${message}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   ScrollSpy & Active Navigation Link
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px'
  });

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   Back To Top Button
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   Contact Form Handling
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-alert');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showFormAlert('Please fill out all required fields.', 'error');
      return;
    }

    const mailtoUri = `mailto:hafizachmadr@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
    window.location.href = mailtoUri;

    showFormAlert('Opening your email client to dispatch message to hafizachmadr@gmail.com. Thank you!', 'success');
    showToast('Email client opened successfully!');
    form.reset();
  });

  function showFormAlert(msg, type) {
    if (!alertBox) return;
    alertBox.textContent = msg;
    alertBox.style.display = 'block';
    alertBox.style.padding = '0.75rem 1rem';
    alertBox.style.marginTop = '1rem';
    alertBox.style.borderRadius = '8px';
    alertBox.style.fontSize = '0.9rem';
    alertBox.style.fontWeight = '500';

    if (type === 'success') {
      alertBox.style.background = 'rgba(16, 185, 129, 0.15)';
      alertBox.style.color = '#10b981';
      alertBox.style.border = '1px solid rgba(16, 185, 129, 0.3)';
    } else {
      alertBox.style.background = 'rgba(244, 63, 94, 0.15)';
      alertBox.style.color = '#f43f5e';
      alertBox.style.border = '1px solid rgba(244, 63, 94, 0.3)';
    }

    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 6000);
  }
}

/* ==========================================================================
   Terminal Run Code Simulation
   ========================================================================== */
function initTerminalRun() {
  const btn = document.getElementById('btn-run-code');
  const output = document.getElementById('terminal-output');
  if (!btn || !output) return;

  btn.addEventListener('click', () => {
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Executing...';
    btn.disabled = true;

    setTimeout(() => {
      output.style.display = 'block';
      output.innerHTML = '<i class="fas fa-check-circle"></i> [OK 200]: engineer.config.ts compiled in 14ms • SLA: 99.9% Online • Ready for impact!';
      btn.innerHTML = '<i class="fas fa-redo"></i> Re-run';
      btn.disabled = false;
      showToast('TypeScript compilation successful: 0 errors!');
    }, 450);
  });
}
