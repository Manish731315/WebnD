 // Enhanced Competition-Grade Loader with Percentage
        let loadingProgress = 0;
        const loadingPercentage = document.getElementById('loadingPercentage');

        const progressInterval = setInterval(() => {
            loadingProgress += Math.random() * 15 + 5;
            if (loadingProgress > 100) loadingProgress = 100;

            loadingPercentage.textContent = Math.floor(loadingProgress) + '%';

            if (loadingProgress >= 100) {
                clearInterval(progressInterval);
                setTimeout(() => {
                    const loader = document.getElementById('loader');
                    loader.style.opacity = '0';
                    loader.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 800);
                }, 500);
            }
        }, 150);

        window.addEventListener('load', function () {
            // Ensure minimum loading time for better UX
            setTimeout(() => {
                loadingProgress = 100;
            }, 2500);
        });

        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;

        themeToggle.addEventListener('click', function () {
            if (body.getAttribute('data-theme') === 'dark') {
                body.removeAttribute('data-theme');
                themeToggle.textContent = '🌙';
                localStorage.removeItem('theme');
            } else {
                body.setAttribute('data-theme', 'dark');
                themeToggle.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            }
        });

        // Load saved theme
        if (localStorage.getItem('theme') === 'dark') {
            body.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️';
        }

        // Mobile Menu
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.querySelector('.nav-menu');

        mobileMenuBtn.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            });
        });

        // Smooth Scrolling
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

        // Carousel
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        const slidesContainer = document.getElementById('carouselSlides');
        const totalSlides = slides.length;

        function updateCarousel() {
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }

        // Carousel navigation
        document.getElementById('nextBtn').addEventListener('click', nextSlide);
        document.getElementById('prevBtn').addEventListener('click', prevSlide);

        // Carousel dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
            });
        });

        // Auto-play carousel
        setInterval(nextSlide, 5000);

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-animate').forEach(el => {
            observer.observe(el);
        });

        // Parallax effect
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');

            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Popup Modal
        const modal = document.getElementById('modal');
        const modalClose = document.getElementById('modalClose');
        const modalCta = document.getElementById('modalCta');

        // Show modal after 5 seconds
        setTimeout(() => {
            modal.style.display = 'block';
        }, 5000);

        // Close modal
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modalCta.addEventListener('click', () => {
            modal.style.display = 'none';
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Ripple effect
        document.querySelectorAll('.ripple').forEach(button => {
            button.addEventListener('click', function (e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple-effect');

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Enhanced ripple CSS
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            .ripple-effect {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);

        // Navbar scroll effect
        window.addEventListener('scroll', function () {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = body.getAttribute('data-theme') === 'dark'
                    ? 'rgba(15, 23, 42, 0.98)'
                    : 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = body.getAttribute('data-theme') === 'dark'
                    ? 'rgba(15, 23, 42, 0.95)'
                    : 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        });

        // Active navigation link highlighting
        window.addEventListener('scroll', function () {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });

        // Add active link style
        const activeStyle = document.createElement('style');
        activeStyle.textContent = `
            .nav-menu a.active {
                color: var(--primary-color) !important;
            }
            .nav-menu a.active::after {
                width: 100% !important;
            }
        `;
        document.head.appendChild(activeStyle);

        // Stagger animation for cards
        const cards = document.querySelectorAll('.feature-card, .service-card, .testimonial-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });

        // Add stagger animation CSS
        const staggerStyle = document.createElement('style');
        staggerStyle.textContent = `
            .scroll-animate {
                animation: fadeInUp 0.6s ease forwards;
                animation-play-state: paused;
            }
            .scroll-animate.animate {
                animation-play-state: running;
            }
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(staggerStyle);

        // Add loading animation to CTA buttons
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('click', function (e) {
                if (!this.classList.contains('loading')) {
                    this.classList.add('loading');
                    const originalText = this.textContent;
                    this.textContent = 'Loading...';

                    setTimeout(() => {
                        this.classList.remove('loading');
                        this.textContent = originalText;
                    }, 2000);
                }
            });
        });

        // Add loading button style
        const loadingStyle = document.createElement('style');
        loadingStyle.textContent = `
            .cta-button.loading {
                opacity: 0.7;
                pointer-events: none;
            }
            .cta-button.loading::after {
                content: '';
                position: absolute;
                top: 50%;
                right: 15px;
                width: 16px;
                height: 16px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-top: 2px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                transform: translateY(-50%);
            }
        `;
        document.head.appendChild(loadingStyle);