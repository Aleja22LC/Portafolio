const menuIcon = document.querySelector('.menu-icon');
const navMenu = document.querySelector('.navbar ul');
const navLinks = document.querySelectorAll('.navbar ul li a');
const nav = document.querySelector('.navbar');

// toggle menú mobile
if (menuIcon) {
  menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// cerrar menú al clicar un enlace
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuIcon?.classList.remove('active');
    navMenu?.classList.remove('active');
  });
});


// Inicializar idioma
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('site-lang') || 'es';
  setLanguage(savedLang);
});

// Manejar cambio de idioma
const langToggleBtn = document.getElementById('lang-toggle');
const translations = {
    en: {
        "nav.logo": "Portfolio.",
        "nav.about": "About",
        "nav.portfolio": "Portfolio",
        "nav.services": "Services",
        "nav.contact": "Contact",
        "home.name": "Alejandra Leon",
        "home.intro": "I am",
        "home.role": "Frontend Developer",
        "home.role2": "Designer",
        "home.welcome": "Welcome to my portfolio. Here you will find information about my work, skills and projects.",
        "btn.download": "Download CV",
        "portfolio.heading": "Latest <span>Projects</span>",
        "project1.title":"Card Validation",
        "project1.desc": "The Luhn algorithm is a checksum formula used to validate identification numbers such as credit card numbers.",
        "project2.title":"Olimpic Lovers",
        "project2.desc": "A web application that provides information about the Olympic Games, including history, sports, athletes, and upcoming events.",
        "project3.title": "Social network",
        "project3.desc": " Enjoy The world is, A social network that aims to help thousands of users around the world spread the word about the different festivals celebrated in their cities, seeking to promote tourism.",
        "project4.title": "MD Links",
        "project4.desc": "A command-line application that allows users to extract and validate links from Markdown files.",
        "project5.title": "Burguer Queen Api Client",
        "project5.desc": "A web application that allows restaurant staff to take orders, manage tables, and process payments efficiently.",
        "project6.title": "Basic Digital CV",
        "project6.desc": "Basic design for virtual resumes or CVs.",
        "services.heading": "My <span>Services</span>",
        "service1.title": "Web Design",
        "service1.desc": "Creating visually appealing and user-friendly website designs that align with your brand identity. Designing modern and engaging interfaces focused on user experience. Creating mockups and interactive prototypes.",
        "service1.item1": "Responsive Web Design",
        "service1.item2": "UI/UX Design",
        "service1.item3": "Prototyping",    
        "service1.item4": "Brand Identity Design",
        "service2.title": "Frontend Development",
        "service2.desc": "Building responsive and interactive websites using HTML, CSS, and JavaScript. Implementing designs into functional web pages. Ensuring cross-browser compatibility and optimizing performance.",
        "service2.item1": "Responsive Development",
        "service2.item2": "Performance Optimization",
        "service2.item3": "Cross-Browser Compatibility",
        "service2.item4": "Version Control (Git)",
        "footer.heading": "Contact <span>Me</span>",
        "footer.desc": "Have a project in mind? Let's talk!"
    },
    es: {
        "nav.logo": "Portafolio.",
        "nav.about": "Sobre Mi",
        "nav.portfolio": "Portafolio",
        "nav.services": "Servicios",
        "nav.contact": "Contactame",
        "home.name": "Alejandra Leon",
        "home.intro": "Soy",
        "home.role": "Desarrolladora Frontend",
        "home.role2": "Diseñadora",
        "home.welcome": "Bienvenido a mi portafolio. Aquí encontrarás información sobre mi trabajo, habilidades y proyectos.",
        "btn.download": "Descargar CV",
        "portfolio.heading": "Últimos <span>Proyectos</span>",
        "project1.title":"Validacion de Tarjeta",
        "project1.desc": "El algoritmo de Luhn, es un método de suma de verificación, se utiliza para validacion de números de identificación; tales como números de tarjetas de crédito.",
        "project2.title":"Amantes Olímpicos",   
        "services.heading": "Mis <span>Servicios</span>",
        "footer.heading": "Contacta <span>Me</span>",
        "footer.desc": "¿Tienes un proyecto en mente? ¡Hablemos!"
    }
};

function setLanguage(lang) {
    if (!translations[lang]) return;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const translation = translations[lang][key];
        
        if (translation) {
            if (translation.includes('<')) {
                el.innerHTML = translation;
            } else {
                el.textContent = translation;
                // Actualizar el atributo data-text para elementos typing
                if (el.classList.contains('typing')) {
                    el.setAttribute('data-text', translation);
                }
            }
        }
    });
    
    // Actualizar texto del botón
    if (langToggleBtn) {
        langToggleBtn.textContent = lang === 'es' ? 'EN' : 'ES';
    }
    
    // Guardar preferencia
    localStorage.setItem('preferred-lang', lang);
}

// Inicializar idioma
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferred-lang') || 'es';
    setLanguage(savedLang);
});

// Manejar clic en el botón
if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        const currentLang = localStorage.getItem('preferred-lang') || 'es';
        const newLang = currentLang === 'es' ? 'en' : 'es';
        setLanguage(newLang);
    });
}

// observar secciones (incluye footer con id)
const sections = document.querySelectorAll('section[id], footer[id]');
const navOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-offset')) || 90;

const ioOptions = {
  root: null,
  rootMargin: `-${navOffset}px 0px -40% 0px`,
  threshold: 0
};

const ioCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');

      navLinks.forEach(link => {
        const li = link.parentElement;
        if (!li) return;
        if (link.getAttribute('href') === `#${id}`) li.classList.add('active');
        else li.classList.remove('active');
      });

      if (typeof updateNavbarColor === 'function') updateNavbarColor(id);
    }
  });
};

const observer = new IntersectionObserver(ioCallback, ioOptions);
sections.forEach(sec => observer.observe(sec));

// marcar estado inicial al cargar
window.addEventListener('load', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - navOffset;
    const height = sec.offsetHeight;
    if (pageYOffset >= top && pageYOffset < top + height) current = sec.getAttribute('id');
  });
  if (current) {
    navLinks.forEach(link => {
      const li = link.parentElement;
      if (!li) return;
      if (link.getAttribute('href') === `#${current}`) li.classList.add('active');
      else li.classList.remove('active');
    });
    if (typeof updateNavbarColor === 'function') updateNavbarColor(current);
  }
});

