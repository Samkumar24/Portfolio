/* ===== DATA ===== */
const SKILLS = [
  { name: 'Python', icon: 'devicon-python-plain colored' },
  { name: 'MySQL', icon: 'devicon-mysql-plain colored' },

  // 🔥 FIXED POWER BI
  { name: 'Power BI', icon: 'custom-powerbi' },

  { name: 'Scikit-learn', icon: 'devicon-scikitlearn-plain colored' },
  { name: 'TensorFlow', icon: 'devicon-tensorflow-original colored' },
  { name: 'AWS', icon: 'devicon-amazonwebservices-plain-wordmark colored' },
  { name: 'Git', icon: 'devicon-git-plain colored' },
  { name: 'Docker', icon: 'devicon-docker-plain colored' }
];


const PROJECTS = [
  {
    id: 'fashion-rec',
    title: 'End-to-End Fashion Recommendation System (MLOps)',
    short: 'Built a cold-start fashion recommendation system with MLOps practices, CI/CD pipelines, and AWS deployment.',
    description: 'Built a comprehensive cold-start fashion recommendation system with end-to-end ML pipeline implementation. Designed complete workflow from data processing to model deployment. Implemented MLOps best practices for automation and reproducibility. Developed CI/CD pipelines using GitHub Actions for automated testing and deployment. Successfully deployed the system on AWS EC2 for real-time inference and production use.',
    tech: ['Python', 'Scikit-learn', 'TensorFlow', 'AWS', 'MLOps', 'CI/CD', 'GitHub Actions'],
    github: 'https://github.com/Samkumar24/End-to-End-Fashion-Recommendation-System-with-MLOps',
    images: [
      'https://i.ibb.co/8DTm8dXN/Untitled-Diagram-drawio-1.png',
      'https://i.ibb.co/qM3TWtQ5/P3-3.png',
      'https://i.ibb.co/HpT6myX3/P3-1.png',
      'https://i.ibb.co/8DgWK75t/P3-2.png'
    ]
  },
  {
    id: 'goodcabs',
    title: 'Operational Performance Analysis – Goodcabs',
    short: 'SQL and Power BI analysis of trip performance, customer satisfaction, and seasonal trends across cities.',
    description: 'Executed comprehensive SQL and Power BI analysis across multiple cities to evaluate operational performance. Analyzed trip performance metrics, repeat passenger behavior, and customer satisfaction scores. Identified seasonal trends and customer behavior patterns through data-driven insights. Delivered actionable recommendations to improve marketing strategies and customer retention rates.',
    tech: ['SQL', 'Python', 'Power BI', 'Data Analytics'],
    github: 'https://github.com/Samkumar24/-Operational-Performance-Analysis-Code-Basics',
    images: [
      'https://i.ibb.co/3YNHMwKK/Goodcab-P1.png',
      'https://i.ibb.co/TBNn0Xt8/Goodcab-P2.png',
      'https://i.ibb.co/pBFdGpHg/Goodcab-P3.png',
      'https://i.ibb.co/3YrPhHxf/Goodcab-P4.png'
    ]
  },
  {
    id: 'air-pure',
    title: 'Market Segmentation Analysis – Air Pure Innovations',
    short: 'AQI analysis identifying high-demand cities and building demand validation framework.',
    description: 'Analyzed comprehensive AQI and pollution data using Python to identify market opportunities. Identified high-demand cities and key pollutant patterns affecting consumer behavior. Conducted detailed competitor analysis and pricing strategy evaluation. Built a robust demand validation framework and comprehensive go-to-market strategy for product launch.',
    tech: ['Python', 'Pandas', 'NumPy', 'Data Visualization', 'Market Analysis'],
    github: 'https://github.com/Samkumar24/Market-Fit-Research-for-Air-Purifier-Development-Using-AQI-Analytics',
    images: [
      'https://i.ibb.co/9k29Qvmg/Air-p1.png',
      'https://i.ibb.co/7DDt28M/Air-p2.png',
      'https://i.ibb.co/gLVsC29p/Air-3.png',
      'https://i.ibb.co/hxhtBh8Q/Air-4.png',
      'https://i.ibb.co/ZpqFZj0F/Air-5.png',
      'https://i.ibb.co/7NvMBnZ6/Air-6.png'
    ]
  }
];

/* ===== DOM REFS ===== */
const $ = id => document.getElementById(id);
const skillsGrid     = $('skillsGrid');
const projectsGrid   = $('projectsGrid');
const modalOverlay   = $('modalOverlay');
const modal          = $('modal');
const modalClose     = $('modalClose');
const modalTitle     = $('modalTitle');
const modalDesc      = $('modalDesc');
const modalTech      = $('modalTech');
const modalGithub    = $('modalGithub');
const slideshowTrack = $('slideshowTrack');
const slideshowDots  = $('slideshowDots');
const slidePrev      = $('slidePrev');
const slideNext      = $('slideNext');
const sidebarToggle  = $('sidebarToggle');
const sidebar        = $('sidebar');

/* ===== RENDER SKILLS ===== */
SKILLS.forEach(skill => {
  const el = document.createElement('div');
  el.className = 'skill-card';

  if (skill.icon === 'custom-powerbi') {
    el.innerHTML = `
      <img src=""https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg"" class="skill-icon">
      <span>${skill.name}</span>
    `;
  } else {
    el.innerHTML = `
      <i class="${skill.icon} skill-icon"></i>
      <span>${skill.name}</span>
    `;
  }

  skillsGrid.appendChild(el);
});

/* ===== RENDER PROJECT CARDS ===== */
PROJECTS.forEach((proj, i) => {
  const card = document.createElement('div');
  card.className = 'project-card fade-in';
  card.dataset.index = i;
  card.id = `project-card-${proj.id}`;
  card.innerHTML = `
    <div class="card-thumb">
      <img src="${proj.images[0]}" alt="${proj.title}" loading="lazy">
    </div>
    <div class="card-body">
      <span class="card-arrow">&#8599;</span>
      <h3>${proj.title}</h3>
      <p>${proj.short}</p>
    </div>
  `;
  card.addEventListener('click', () => openModal(i));
  projectsGrid.appendChild(card);
});

/* ===== SLIDESHOW STATE ===== */
let currentSlide = 0;
let slideCount = 0;
let autoPlayTimer = null;

function goToSlide(n) {
  currentSlide = (n + slideCount) % slideCount;
  slideshowTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.slideshow-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function startAutoPlay() {
  stopAutoPlay();
  autoPlayTimer = setInterval(() => goToSlide(currentSlide + 1), 4000);
}

function stopAutoPlay() {
  if (autoPlayTimer) { clearInterval(autoPlayTimer); autoPlayTimer = null; }
}

/* ===== MODAL ===== */
function openModal(index) {
  const proj = PROJECTS[index];

  modalTitle.textContent = proj.title;
  modalDesc.textContent  = proj.description;
  modalGithub.href       = proj.github;

  /* Tech badges */
  modalTech.innerHTML = '';
  proj.tech.forEach(t => {
    const badge = document.createElement('span');
    badge.className = 'tech-badge';
    badge.textContent = t;
    modalTech.appendChild(badge);
  });

  /* Slideshow images */
  slideshowTrack.innerHTML = '';
  slideshowDots.innerHTML  = '';
  slideCount = proj.images.length;
  currentSlide = 0;

  proj.images.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `${proj.title} screenshot ${i + 1}`;
    img.loading = 'lazy';
    slideshowTrack.appendChild(img);

    const dot = document.createElement('button');
    dot.className = 'slideshow-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => { goToSlide(i); startAutoPlay(); });
    slideshowDots.appendChild(dot);
  });

  slideshowTrack.style.transform = 'translateX(0)';

  /* Show */
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  startAutoPlay();

  /* Focus trap */
  modal.focus();
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
  stopAutoPlay();
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});

slidePrev.addEventListener('click', () => { goToSlide(currentSlide - 1); startAutoPlay(); });
slideNext.addEventListener('click', () => { goToSlide(currentSlide + 1); startAutoPlay(); });

/* Keyboard support */
document.addEventListener('keydown', e => {
  if (!modalOverlay.classList.contains('active')) return;
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowLeft')  { goToSlide(currentSlide - 1); startAutoPlay(); }
  if (e.key === 'ArrowRight') { goToSlide(currentSlide + 1); startAutoPlay(); }
});

/* ===== SIDEBAR TOGGLE (MOBILE) ===== */
sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  sidebarToggle.classList.toggle('active');
});

/* Close sidebar when clicking main content on mobile */
document.querySelector('.main').addEventListener('click', () => {
  if (sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
    sidebarToggle.classList.remove('active');
  }
});

/* ===== SCROLL FADE-IN ===== */
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  }),
  { threshold: 0.1 }
);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* Add fade-in to sections */
document.querySelectorAll('.section').forEach(sec => {
  sec.classList.add('fade-in');
  observer.observe(sec);
});

window.onload = () => {
  lucide.createIcons();
};
