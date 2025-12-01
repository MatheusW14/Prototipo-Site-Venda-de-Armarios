let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    // Pega a posição atual da rolagem
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // ROLANDO PARA BAIXO -> Esconde o menu
        navbar.classList.add('navbar-hidden');
    } else {
        // ROLANDO PARA CIMA -> Mostra o menu
        navbar.classList.remove('navbar-hidden');
    }
    
    // Atualiza a última posição para a próxima comparação
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Evita números negativos no topo
});

/* 2. CURSOR PERSONALIZADO (Magic Cursor) */

document.addEventListener("DOMContentLoaded", function() {
    
    // Verifica se é Desktop
    if (window.matchMedia("(min-width: 992px)").matches) {
        
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');

        // Se por acaso não achar os elementos, para o script para não dar erro
        if (!cursorDot || !cursorOutline) return;

        window.addEventListener("mousemove", function(e) {
            const posX = e.clientX;
            const posY = e.clientY;

            // Movimento do Ponto (Instantâneo)
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Movimento do Círculo (Com leve animação nativa do browser)
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover Effect
        const links = document.querySelectorAll('a, button, .btn, input, textarea, .form-check-input');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            link.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }
});