 // Resalta el item del nav según la sección visible y cierra el menú mobile al clicar
const menuIcon = document.querySelector('.menu-icon');
const navMenu = document.querySelector('.navbar ul');
const navLinks = document.querySelectorAll('.navbar ul li a');
const sections = document.querySelectorAll('section[id]');

if (menuIcon) {
  menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuIcon?.classList.remove('active');
    navMenu?.classList.remove('active');
  });
});

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-offset')) || 90);
    if (pageYOffset >= top) current = sec.getAttribute('id');
  });

  document.querySelectorAll('.navbar ul li').forEach(li => {
    li.classList.remove('active');
    const a = li.querySelector('a');
    if (a && a.getAttribute('href') === `#${current}`) li.classList.add('active');
  });
});