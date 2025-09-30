const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Opcional: Cambiar el fondo del header al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    }
});

// --- Lógica del Carrusel de Productos ---
document.querySelectorAll('.product-carousel').forEach(carousel => {
    const gridWrapper = carousel.querySelector('.product-grid-wrapper');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');

    if (!gridWrapper || !prevBtn || !nextBtn) return;

    nextBtn.addEventListener('click', () => {
        // Desplazarse por el ancho de una tarjeta de producto + el espacio (gap)
        const scrollAmount = gridWrapper.querySelector('.product-card').offsetWidth + 32; // 32px es 2rem de gap
        gridWrapper.scrollLeft += scrollAmount;
    });

    prevBtn.addEventListener('click', () => {
        // Desplazarse por el ancho de una tarjeta de producto + el espacio (gap)
        const scrollAmount = gridWrapper.querySelector('.product-card').offsetWidth + 32; // 32px es 2rem de gap
        gridWrapper.scrollLeft -= scrollAmount;
    });
});
