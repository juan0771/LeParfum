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

/*
  Funcionalidad:
  - Al hacer clic en cualquier imagen dentro de .product-card se abre un modal
    que muestra el contenido de esa tarjeta (imagen, títulos, precio y botón).
  - Se puede cerrar con el botón de cerrar o clic fuera del modal-content o Esc.
*/

document.addEventListener('click', function (e) {
    // detectar clic en imagen dentro de .product-card
    const img = e.target.closest('.product-card img');
    if (!img) return;

    const card = img.closest('.product-card');
    if (!card) return;

    openModalWithCard(card);
});

function openModalWithCard(card) {
    const modal = document.getElementById('product-modal');
    const body = modal.querySelector('.modal-body');

    // clonar contenido de la card para no moverla del DOM original
    body.innerHTML = ''; // limpiar
    const clone = card.cloneNode(true);

    // opcional: si quieres que el botón de comprar abra en nueva pestaña, mantener comportamiento
    const buyBtn = clone.querySelector('.add-to-cart-btn');
    if (buyBtn) {
        buyBtn.style.marginTop = '0.6rem';
    }

    body.appendChild(clone);

    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');

    // foco en botón cerrar para accesibilidad
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn?.focus();
}

// cerrar modal con clic en cerrar, clic en fondo o tecla Esc
(function setupModalCloseHandlers() {
    const modal = document.getElementById('product-modal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn?.addEventListener('click', closeModal);

    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal(); // clic en backdrop
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        modal.querySelector('.modal-body').innerHTML = '';
    }
})();
