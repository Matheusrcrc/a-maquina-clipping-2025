// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Filtros do clipping
const filterButtons = document.querySelectorAll('.filter-btn');
const clippingItems = document.querySelectorAll('.clipping-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Adiciona active ao botão clicado
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        clippingItems.forEach(item => {
            if (filter === 'all') {
                item.style.display = 'grid';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                const category = item.getAttribute('data-category');
                if (category === filter) {
                    item.style.display = 'grid';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Animação de entrada para elementos quando aparecem na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.info-card, .quote-card, .clipping-item, .timeline-item, .repercussao-card, .ficha-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Highlight da navegação ao rolar a página
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contador animado para números da repercussão
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observar seção de repercussão para iniciar contadores
const repercussaoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const numbers = entry.target.querySelectorAll('.repercussao-number, .stat-number');
            numbers.forEach(num => {
                const text = num.textContent;
                const value = parseInt(text.replace(/\D/g, ''));
                if (!isNaN(value)) {
                    num.textContent = '0';
                    setTimeout(() => {
                        animateCounter(num, value);
                        // Adiciona o sufixo de volta após a animação
                        setTimeout(() => {
                            if (text.includes('+')) {
                                num.textContent = value + '+';
                            } else if (text.includes('k')) {
                                num.textContent = value + 'k+';
                            }
                        }, 2000);
                    }, 200);
                }
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.section-repercussao, .clipping-stats').forEach(section => {
    repercussaoObserver.observe(section);
});

// Lazy loading para imagens
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback para navegadores que não suportam lazy loading nativo
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

console.log('🎭 A Máquina - Site de Clipping 2025 carregado com sucesso!');

