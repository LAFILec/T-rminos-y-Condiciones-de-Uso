let particleInterval;
let isPageLoaded = false;
let headerHeight = 0;

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

function safeRemoveElement(element) {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

function updateHeaderHeight() {
    const header = document.querySelector('header');
    if (header) {
        headerHeight = header.offsetHeight;
        document.body.style.paddingTop = headerHeight + 'px';
    }
}

function createStars() {
    const starsCount = window.innerWidth > 768 ? 50 : 30;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        star.style.left = randomRange(0, 100) + '%';
        star.style.top = randomRange(0, 60) + '%';
        
        const size = randomRange(1, 4);
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        star.style.animationDelay = randomRange(0, 3) + 's';
        star.style.animationDuration = randomRange(2, 4) + 's';
        
        document.body.appendChild(star);
    }
}

function createFog() {
    const fog = document.createElement('div');
    fog.className = 'fog';
    document.body.appendChild(fog);
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    particle.style.left = randomRange(-5, 105) + 'vw';
    particle.style.animationDelay = randomRange(0, 8) + 's';
    particle.style.animationDuration = randomRange(6, 12) + 's';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        safeRemoveElement(particle);
    }, 20000);
}

function handleParallaxScroll() {
    if (!isPageLoaded || window.innerWidth <= 768) return;
    
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.2;
    const parchment = document.querySelector('.parchment');
    
    if (parchment) {
        parchment.style.transform = `perspective(1000px) rotateX(2deg) translateY(${rate}px)`;
    }
}

function handleHeaderScroll() {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;
    
    if (!header) return;
    
    if (scrolled > 50) {
        header.style.background = `linear-gradient(135deg, rgba(45, 75, 35, 0.98) 0%, rgba(75, 105, 45, 0.98) 50%, rgba(35, 65, 25, 0.98) 100%)`;
        header.style.boxShadow = `0 6px 25px rgba(45, 75, 35, 0.6), 0 0 60px rgba(139, 195, 74, 0.15)`;
    } else {
        header.style.background = `linear-gradient(135deg, rgba(45, 75, 35, 0.95) 0%, rgba(75, 105, 45, 0.95) 50%, rgba(35, 65, 25, 0.95) 100%)`;
        header.style.boxShadow = `0 4px 20px rgba(45, 75, 35, 0.4), 0 0 50px rgba(139, 195, 74, 0.1)`;
    }
}

function setupParchmentHover() {
    const parchment = document.querySelector('.parchment');
    if (!parchment || window.innerWidth <= 768) return;
    
    parchment.addEventListener('mouseenter', () => {
        parchment.style.transform = 'perspective(1000px) rotateX(1deg) translateY(-8px)';
        parchment.style.boxShadow = `0 25px 50px rgba(0, 0, 0, 0.6), inset 0 1px 3px rgba(139, 195, 139, 0.3), inset 0 -1px 3px rgba(0, 0, 0, 0.3)`;
    });
    
    parchment.addEventListener('mouseleave', () => {
        parchment.style.transform = 'perspective(1000px) rotateX(2deg) translateY(0px)';
        parchment.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 3px rgba(139, 195, 139, 0.2), inset 0 -1px 3px rgba(0, 0, 0, 0.3)`;
    });
}

function animateContentLoad() {
    const content = document.querySelector('.content');
    if (content) {
        setTimeout(() => {
            content.classList.add('loaded');
        }, 800);
    }
}

function handleResize() {
    const parchment = document.querySelector('.parchment');
    const isMobile = window.innerWidth <= 768;
    
    updateHeaderHeight();
    
    if (parchment && isMobile) {
        parchment.style.transform = 'none';
    }
    
    const existingStars = document.querySelectorAll('.star');
    if ((isMobile && existingStars.length > 30) || (!isMobile && existingStars.length < 40)) {
        existingStars.forEach(star => safeRemoveElement(star));
        createStars();
    }
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function handleCombinedScroll() {
    handleParallaxScroll();
    handleHeaderScroll();
}

function initializeEffects() {
    try {
        updateHeaderHeight();
        createStars();
        createFog();
        setupParchmentHover();
        animateContentLoad();
        
        window.addEventListener('scroll', throttle(handleCombinedScroll, 16));
        window.addEventListener('resize', throttle(handleResize, 250));
        
        const particleFrequency = window.innerWidth > 768 ? 3000 : 5000;
        particleInterval = setInterval(createParticle, particleFrequency);
        
        isPageLoaded = true;
        
    } catch (error) {
        console.error('Error al inicializar efectos:', error);
    }
}

function cleanup() {
    if (particleInterval) {
        clearInterval(particleInterval);
    }
    
    window.removeEventListener('scroll', handleCombinedScroll);
    window.removeEventListener('resize', handleResize);
}

document.addEventListener('DOMContentLoaded', initializeEffects);
window.addEventListener('load', updateHeaderHeight);
window.addEventListener('beforeunload', cleanup);
window.addEventListener('error', (event) => {
    console.error('Error en script medieval:', event.error);
});
