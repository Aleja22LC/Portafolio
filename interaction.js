const menuIcon = document.querySelector('.menu-icon');
const navMenu = document.querySelector('.navbar ul');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.navbar ul li a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('active');
        navMenu.classList.remove('active');
    });
});