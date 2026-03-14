/* ================================================= */
/* DIDAR ALI – MAIN JAVASCRIPT FILE                  */
/* ================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // ── 1. Preloader ────────────────────────────────
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
        });
        // Failsafe: hide after 3s even if load event is slow
        setTimeout(() => preloader && preloader.classList.add('hidden'), 3000);
    }

    // ── 2. Smooth Scroll (Lenis) ────────────────────
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({ duration: 1.5, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
    }

    // ── 3. AOS Animations ───────────────────────────
    if (typeof AOS !== 'undefined') {
        AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic', offset: 40 });
    }

    // ── 4. Theme Toggle ─────────────────────────────
    const toggleBtn = document.getElementById('theme-toggle');
    const sunIcon   = document.getElementById('sun-icon');
    const moonIcon  = document.getElementById('moon-icon');

    function applyTheme(isDark) {
        document.body.classList.toggle('dark', isDark);
        if (sunIcon)  sunIcon.style.display  = isDark ? 'none'  : 'block';
        if (moonIcon) moonIcon.style.display = isDark ? 'block' : 'none';
    }

    const saved      = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved ? saved === 'dark' : prefersDark);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isDark = !document.body.classList.contains('dark');
            applyTheme(isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // ── 5. Hamburger Menu ───────────────────────────
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const open = navMenu.classList.toggle('open');
            hamburger.classList.toggle('active', open);
        });

        // Close on nav link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                hamburger.classList.remove('active');
            });
        });

        // Close when tapping outside the nav
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('open') &&
                !navMenu.contains(e.target) &&
                !hamburger.contains(e.target)) {
                navMenu.classList.remove('open');
                hamburger.classList.remove('active');
            }
        });
    }

    // ── 6. Scroll Progress Bar ──────────────────────
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            progressBar.style.width = Math.min(scrolled * 100, 100) + '%';
        }, { passive: true });
    }

    // ── 7. Back to Top ──────────────────────────────
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ── 8. Skill Bar Animations ─────────────────────
    const bars = document.querySelectorAll('.skill-bar-fill');
    if (bars.length) {
        const barObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    barObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        bars.forEach(b => barObs.observe(b));
    }

    // ── 9. Contact Form ─────────────────────────────
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const f   = e.target;
            const btn = f.querySelector('button[type="submit"]');
            const orig = btn.innerHTML;

            btn.innerHTML  = '<i class="fas fa-spinner fa-spin"></i> Opening…';
            btn.disabled   = true;

            const subject = encodeURIComponent(f.subject.value);
            const body    = encodeURIComponent(
                `Hi Didar,\n\nName: ${f.name.value}\nEmail: ${f.email.value}\n\nMessage:\n${f.message.value}`
            );
            window.location.href = `mailto:didarali1129@gmail.com?subject=${subject}&body=${body}`;

            setTimeout(() => {
                btn.innerHTML = orig;
                btn.disabled  = false;
                f.reset();
            }, 2500);
        });
    }

});
