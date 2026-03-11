document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       MATRIX RAIN BACKGROUND ANIMATION
       ========================================== */
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Characters for the matrix rain
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~'.split('');
    
    const fontSize = 14;
    let columns = width / fontSize;

    let drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function drawMatrix() {
        // Black background with opacity to create trail effect
        ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#00ff41'; // Matrix Green
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            // Random character string
            const text = chars[Math.floor(Math.random() * chars.length)];

            // x coordinate is i * fontSize, y is drops[i] * fontSize
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Send drop back to top randomly after it has crossed the screen
            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Increment y coordinate
            drops[i]++;
        }
    }

    // Run animation
    setInterval(drawMatrix, 35);

    // Handle window resize
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = width / fontSize;
        drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
    });

    /* ==========================================
       SCROLL ANIMATIONS & LOGIC
       ========================================== */
    
    // Smooth Scrolling for Navigation
    document.querySelectorAll('.nav-link, .btn[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Highlight active link
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                if (this.classList.contains('nav-link')) {
                    this.classList.add('active');
                }
            }
        });
    });

    // Intersection Observer for scroll reveal elements
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(el => observer.observe(el));

    // Force hero reveal immediately
    setTimeout(() => {
        document.querySelector('#hero .reveal')?.classList.add('active');
    }, 100);

});
