// ===== VARIABLES GLOBALES =====
let particleInterval;
let isPageLoaded = false;
let headerHeight = 0;

// ===== FUNCIONES DE UTILIDAD =====
/**
 * Función para generar números aleatorios en un rango
 */
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Función para remover elementos de forma segura
 */
function safeRemoveElement(element) {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

/**
 * Calcular altura del header para ajustes de layout
 */
function updateHeaderHeight() {
    const header = document.querySelector('header');
    if (header) {
        headerHeight = header.offsetHeight;
        document.body.style.paddingTop = headerHeight + 'px';
    }
}

// ===== FUNCIONES DE CREACIÓN DE EFECTOS =====
/**
 * Crear estrellas en el cielo
 */
function createStars() {
    const starsCount = 50;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Posición aleatoria
        star.style.left = randomRange(0, 100) + '%';
        star.style.top = randomRange(0, 60) + '%';
        
        // Tamaño aleatorio
        const size = randomRange(1, 4);
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Animación aleatoria
        star.style.animationDelay = randomRange(0, 3) + 's';
        star.style.animationDuration = randomRange(2, 4) + 's';
        
        // Agregar al DOM
        document.body.appendChild(star);
    }
}

/**
 * Crear efecto de niebla
 */
function createFog() {
    const fog = document.createElement('div');
    fog.className = 'fog';
    document.body.appendChild(fog);
}

/**
 * Crear partículas flotantes
 */
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Posición inicial aleatoria
    particle.style.left = randomRange(-5, 105) + 'vw';
    
    // Animación aleatoria
    particle.style.animationDelay = randomRange(0, 8) + 's';
    particle.style.animationDuration = randomRange(6, 12) + 's';
    
    // Agregar al DOM
    document.body.appendChild(particle);
    
    // Remover después de la animación (tiempo máximo + delay)
    setTimeout(() => {
        safeRemoveElement(particle);
    }, 20000);
}

// ===== EFECTOS DE SCROLL Y PARALLAX =====
/**
 * Efecto parallax para el pergamino
 */
function handleParallaxScroll() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.2; // Más sutil para evitar conflictos con header fijo
    const parchment = document.querySelector('.parchment');
    
    if (parchment && isPageLoaded) {
        const isMobile = window.innerWidth <= 768;
        
        if (!isMobile) {
            parchment.style.transform = `perspective(1000px) rotateX(2deg) translateY(${rate}px)`;
        }
    }
}

/**
 * Efecto de header al hacer scroll
 */
function handleHeaderScroll() {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;
    
    if (header) {
        if (scrolled > 50) {
            header.style.background = `
                linear-gradient(135deg, rgba(45, 75, 35, 0.98) 0%, rgba(75, 105, 45, 0.98) 50%, rgba(35, 65, 25, 0.98) 100%)
            `;
            header.style.boxShadow = `
                0 6px 25px rgba(45, 75, 35, 0.6),
                0 0 60px rgba(139, 195, 74, 0.15)
            `;
        } else {
            header.style.background = `
                linear-gradient(135deg, rgba(45, 75, 35, 0.95) 0%, rgba(75, 105, 45, 0.95) 50%, rgba(35, 65, 25, 0.95) 100%)
            `;
            header.style.boxShadow = `
                0 4px 20px rgba(45, 75, 35, 0.4),
                0 0 50px rgba(139, 195, 74, 0.1)
            `;
        }
    }
}

// ===== EFECTOS DE HOVER =====
/**
 * Configurar efectos de hover para el pergamino
 */
function setupParchmentHover() {
    const parchment = document.querySelector('.parchment');
    
    if (!parchment) return;
    
    parchment.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            parchment.style.transform = 'perspective(1000px) rotateX(1deg) translateY(-8px)';
            parchment.style.boxShadow = `
                0 25px 50px rgba(0, 0, 0, 0.6), 
                inset 0 1px 3px rgba(139, 195, 139, 0.3), 
                inset 0 -1px 3px rgba(0, 0, 0, 0.3)
            `;
        }
    });
    
    parchment.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            parchment.style.transform = 'perspective(1000px) rotateX(2deg) translateY(0px)';
            parchment.style.boxShadow = `
                0 20px 40px rgba(0, 0, 0, 0.5), 
                inset 0 1px 3px rgba(139, 195, 139, 0.2), 
                inset 0 -1px 3px rgba(0, 0, 0, 0.3)
            `;
        }
    });
}

// ===== ANIMACIONES DE CARGA =====
/**
 * Animar la aparición del contenido
 */
function animateContentLoad() {
    const content = document.querySelector('.content');
    
    if (content) {
        // Después de un pequeño delay, mostrar el contenido
        setTimeout(() => {
            content.classList.add('loaded');
        }, 800);
    }
}

// ===== GESTIÓN DE EVENTOS =====
/**
 * Manejar el redimensionado de ventana
 */
function handleResize() {
    const parchment = document.querySelector('.parchment');
    const isMobile = window.innerWidth <= 768;
    
    // Actualizar altura del header
    updateHeaderHeight();
    
    if (parchment && isMobile) {
        // Resetear transformaciones en móvil
        parchment.style.transform = 'none';
    }
}

/**
 * Optimizar el scroll con throttling
 */
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

/**
 * Manejar scroll combinado (parallax + header)
 */
function handleCombinedScroll() {
    handleParallaxScroll();
    handleHeaderScroll();
}

// ===== INICIALIZACIÓN =====
/**
 * Inicializar todos los efectos cuando el DOM esté listo
 */
function initializeEffects() {
    try {
        // Calcular altura inicial del header
        updateHeaderHeight();
        
        // Crear efectos de fondo
        createStars();
        createFog();
        
        // Configurar interacciones
        setupParchmentHover();
        
        // Animar contenido
        animateContentLoad();
        
        // Configurar eventos de scroll (con throttling)
        window.addEventListener('scroll', throttle(handleCombinedScroll, 16));
        
        // Configurar evento de resize
        window.addEventListener('resize', throttle(handleResize, 250));
        
        // Iniciar creación de partículas
        particleInterval = setInterval(createParticle, 3000);
        
        // Marcar como cargado
        isPageLoaded = true;
        
        console.log('Efectos medievales inicializados correctamente');
        
    } catch (error) {
        console.error('Error al inicializar efectos:', error);
    }
}

/**
 * Limpiar recursos cuando se cierre la página
 */
function cleanup() {
    if (particleInterval) {
        clearInterval(particleInterval);
    }
    
    // Remover event listeners
    window.removeEventListener('scroll', handleCombinedScroll);
    window.removeEventListener('resize', handleResize);
}

// ===== EVENT LISTENERS PRINCIPALES =====
// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initializeEffects);

// Recalcular header al cargar completamente
window.addEventListener('load', updateHeaderHeight);

// Limpiar recursos al cerrar la página
window.addEventListener('beforeunload', cleanup);

// Manejar errores globales de JavaScript
window.addEventListener('error', (event) => {
    console.error('Error en script medieval:', event.error);
});

// ===== FUNCIONES DE DEBUG (solo en desarrollo) =====
// Función para verificar el estado de la página (opcional)
function debugStatus() {
    return {
        isLoaded: isPageLoaded,
        starsCount: document.querySelectorAll('.star').length,
        particlesCount: document.querySelectorAll('.particle').length,
        fogExists: !!document.querySelector('.fog')
    };
}

// Exponer función de debug en development
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    window.medievalDebug = debugStatus;
}