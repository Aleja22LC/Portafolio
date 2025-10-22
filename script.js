 // ...existing code...
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

// observar secciones (incluye footer con id)
const sections = document.querySelectorAll('section[id], footer[id]');
const navOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-offset')) || 90;

const ioOptions = {
  root: null,
  rootMargin: `-${navOffset}px 0px -40% 0px`, // ajusta el -40% si quieres cambiar el punto de activación
  threshold: 0
};

const ioCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');

      // actualizar clase active en el nav
      navLinks.forEach(link => {
        const li = link.parentElement;
        if (!li) return;
        if (link.getAttribute('href') === `#${id}`) li.classList.add('active');
        else li.classList.remove('active');
      });

      // Si existe updateNavbarColor, llamarla
      if (typeof updateNavbarColor === 'function') updateNavbarColor(id);
    }
  });
};

const observer = new IntersectionObserver(ioCallback, ioOptions);
sections.forEach(sec => observer.observe(sec));

// marcar estado inicial al cargar
window.addEventListener('load', () => {
  // forzar comprobación: si alguna sección está visible el observer la marcará
  // pero por seguridad, hacemos un cálculo rápido
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
// ...existing code...