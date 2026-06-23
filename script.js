document.addEventListener('DOMContentLoaded', () => {

  const themeToggle = document.getElementById('themeToggle');

  if(localStorage.getItem('theme') === 'light'){
    document.body.classList.add('light');
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  const navbar = document.getElementById('navbar');

  function handleNavScroll(){
    if(window.scrollY > 40){
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink(){
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');

      if(scrollY >= top && scrollY < top + height){
        navLinks.forEach(link => {
          link.classList.remove('active');
          if(link.getAttribute('href') === `#${id}`){
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  const hamburger   = document.getElementById('hamburger');
  const navLinksEl  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksEl.classList.toggle('open');
    document.body.style.overflow = navLinksEl.classList.contains('open') ? 'hidden' : '';
  });

  navLinksEl.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksEl.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', (e) => {
    if(
      navLinksEl.classList.contains('open') &&
      !navLinksEl.contains(e.target) &&
      !hamburger.contains(e.target)
    ){
      hamburger.classList.remove('open');
      navLinksEl.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  const revealGroups = [
    '.skills-grid .skill-category',
    '.projects-grid .project-card',
    '.tech-tags .tag',
    '.about-stat-grid .stat-item',
  ];

  revealGroups.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, idx) => {
      el.dataset.delay = idx * 100;
    });
  });

  revealEls.forEach(el => revealObserver.observe(el));

  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const fill    = entry.target;
          const targetW = fill.dataset.width || '0';
          setTimeout(() => {
            fill.style.width = targetW + '%';
          }, 200);
          skillObserver.unobserve(fill);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillFills.forEach(fill => skillObserver.observe(fill));

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const targetId = this.getAttribute('href');
      if(targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if(!targetEl) return;

      e.preventDefault();
      const navHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
        10
      ) || 68;

      const top = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  const heroBgText = document.querySelector('.hero-bg-text');

  if(heroBgText){
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if(scrolled < window.innerHeight){
        heroBgText.style.transform =
          `translateY(calc(-50% + ${scrolled * 0.2}px))`;
      }
    }, { passive: true });
  }

});
