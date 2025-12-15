let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        navbar.classList.add('navbar-hidden');
    } else {
        navbar.classList.remove('navbar-hidden');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
});

document.addEventListener("DOMContentLoaded", function() {
    
    if (window.matchMedia("(min-width: 992px)").matches) {
        
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');

        if (!cursorDot || !cursorOutline) return;

        window.addEventListener("mousemove", function(e) {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        const links = document.querySelectorAll('a, button, .btn, input, textarea, .form-check-input');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            link.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }
});

   const newsletterForm = document.getElementById('newsletterForm');

   if (newsletterForm) {
       newsletterForm.addEventListener('submit', async function(e) {
           e.preventDefault();
           
           const emailInput = document.getElementById('newsletterEmail');
           const btn = this.querySelector('button');
           const originalIcon = btn.innerHTML;
   
           btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
           btn.disabled = true;
   
           try {
               const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                   method: 'POST',
                   body: JSON.stringify({
                       email: emailInput.value,
                       source: 'Mario Marcenaria Site'
                   }),
                   headers: {
                       'Content-type': 'application/json; charset=UTF-8',
                   },
               });

               if (response.ok) {
                   btn.innerHTML = '<i class="fas fa-check"></i>';
                   emailInput.value = '';
                   const originalPlaceholder = emailInput.placeholder;
                   emailInput.placeholder = "Inscrição confirmada!";
                   
                   setTimeout(() => {
                       btn.innerHTML = originalIcon;
                       btn.disabled = false;
                       emailInput.placeholder = originalPlaceholder;
                   }, 3000);
               } else {
                   throw new Error('Erro na resposta da API');
               }
   
           } catch (error) {
               console.error('Erro:', error);
               btn.innerHTML = '<i class="fas fa-times text-danger"></i>';
               setTimeout(() => {
                   btn.innerHTML = originalIcon;
                   btn.disabled = false;
               }, 3000);
           }
       });
   }