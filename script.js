const revealElements = document.querySelectorAll(
    '.section-title, .about-text, .about-image, .service-card, .project-card, .design-slot, .contact > p, .contact-form'
);

revealElements.forEach((element) => {
    element.classList.add('reveal');
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
    });
}, {
    threshold: 0.15
});

revealElements.forEach((element) => revealObserver.observe(element));

const tiltTargets = document.querySelectorAll('.service-card, .project-card, .design-slot');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion) {
    tiltTargets.forEach((target) => {
        target.addEventListener('pointermove', (event) => {
            const bounds = target.getBoundingClientRect();
            const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
            const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

            target.style.setProperty('--tilt-x', `${vertical * -6}deg`);
            target.style.setProperty('--tilt-y', `${horizontal * 6}deg`);
        });

        target.addEventListener('pointerleave', () => {
            target.style.setProperty('--tilt-x', '0deg');
            target.style.setProperty('--tilt-y', '0deg');
        });
    });
}

if (!reducedMotion) {
    const rainLayer = document.createElement('div');
    rainLayer.className = 'rain-layer';
    rainLayer.setAttribute('aria-hidden', 'true');

    for (let index = 0; index < 70; index += 1) {
        const drop = document.createElement('span');
        drop.className = 'rain-drop';
        drop.style.left = `${Math.random() * 115}%`;
        drop.style.animationDuration = `${0.7 + Math.random() * 0.9}s`;
        drop.style.animationDelay = `${Math.random() * -2}s`;
        drop.style.opacity = `${0.25 + Math.random() * 0.65}`;
        drop.style.height = `${35 + Math.random() * 55}px`;
        rainLayer.appendChild(drop);
    }

    document.body.prepend(rainLayer);
}