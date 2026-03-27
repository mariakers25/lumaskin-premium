document.addEventListener('DOMContentLoaded', () => {
    // Header Logic: Add class when scrolling past hero
    const header = document.getElementById('main-header');
    const hero = document.getElementById('hero');
    
    window.addEventListener('scroll', () => {
        const threshold = hero.offsetHeight * 0.6;
        if (window.scrollY > threshold) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const panel = header.nextElementSibling;
            const icon = header.querySelector('span');
            
            // Toggle active state
            const isActive = item.classList.contains('active');
            
            // Close all other panels
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-panel').style.maxHeight = null;
                otherItem.querySelector('.accordion-header span').textContent = '+';
            });
            
            // Open clicked panel if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                panel.style.maxHeight = panel.scrollHeight + "px";
                icon.textContent = '-';
            } else {
                icon.textContent = '+';
            }
        });
    });

    // Reveal animation on scroll using IntersectionObserver
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once visible
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
    
    // Smooth scroll for nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Avoid error with document.querySelector('#')
            if (targetId === '#') return;
            
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
