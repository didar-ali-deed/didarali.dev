/* ================================================= */
/* DIDAR ALI – MAIN JAVASCRIPT FILE               */
/* Handles: Dark Mode, Smooth Scroll, Form, AOS   */
/* ================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // 1. Initialize Lenis (Smooth Scroll)
    const lenis = new Lenis({
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
    function raf(t) {
        lenis.raf(t);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Initialize AOS (Animations)
    AOS.init({ once: true, duration: 1000, offset: 50 });

    // 3. Dark Mode Logic
    const toggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    // Check saved theme or system preference
    const currentTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (currentTheme === 'dark' || (!currentTheme && systemPrefersDark)) {
        document.body.classList.add('dark');
    }

    // Function to toggle UI icons
    const updateIcons = () => {
        const isDark = document.body.classList.contains('dark');
        if (sunIcon && moonIcon) {
            sunIcon.style.display = isDark ? 'none' : 'block';
            moonIcon.style.display = isDark ? 'block' : 'none';
        }
    };

    // Run once on load
    updateIcons();

    // Event Listener for Toggle
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            updateIcons();
        });
    }

    // 4. Contact Form Handling (Specific to Contact Page)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.onsubmit = (e) => {
            e.preventDefault();
            const f = e.target;
            // Constructs the mailto link dynamically
            const subject = encodeURIComponent(f.subject.value);
            const body = encodeURIComponent(
                `Name: ${f.name.value}\nEmail: ${f.email.value}\n\nMessage:\n${f.message.value}`
            );
            window.location.href = `mailto:didarali1129@gmail.com?subject=${subject}&body=${body}`;
        };
    }
});