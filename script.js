/**
 * Portfolio Website - Main JavaScript
 * =====================================
 * Features:
 * - Smooth scrolling
 * - Navbar scroll effects
 * - Mobile menu toggle
 * - Dark/Light theme toggle
 * - Scroll reveal animations
 * - Skill bar animations
 * - Form validation
 * - Loading screen
 * - Counter animations
 */

// ========================================
// DOM ELEMENTS
// ========================================

const DOM = {
    loader: document.getElementById('loader'),
    navbar: document.getElementById('navbar'),
    navMenu: document.getElementById('nav-menu'),
    navLinks: document.querySelectorAll('.nav-link'),
    hamburger: document.getElementById('hamburger'),
    themeToggle: document.getElementById('theme-toggle'),
    contactForm: document.getElementById('contact-form'),
    formStatus: document.getElementById('form-status'),
    revealElements: document.querySelectorAll('.reveal'),
    skillItems: document.querySelectorAll('.skill-item'),
    statNumbers: document.querySelectorAll('.stat-number'),
};

// ========================================
// CONFIGURATION
// ========================================

const CONFIG = {
    scrollThreshold: 50,
    revealOffset: 150,
    animationDelay: 100,
    counterDuration: 2000,
    loaderDelay: 800,
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight - offset) &&
        rect.bottom >= 0
    );
}

/**
 * Get current scroll position
 */
function getScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

// ========================================
// LOADER
// ========================================

function initLoader() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            DOM.loader.classList.add('hidden');
            // Trigger initial reveal animations after loader hides
            setTimeout(revealOnScroll, 100);
        }, CONFIG.loaderDelay);
    });
}

// ========================================
// NAVBAR
// ========================================

function initNavbar() {
    // Scroll effect
    const handleNavScroll = debounce(() => {
        if (getScrollPosition() > CONFIG.scrollThreshold) {
            DOM.navbar.classList.add('scrolled');
        } else {
            DOM.navbar.classList.remove('scrolled');
        }
    }, 5);

    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll(); // Check initial state
}

// ========================================
// ACTIVE SECTION INDICATOR
// ========================================

function initActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    
    const updateActiveLink = debounce(() => {
        const scrollPos = getScrollPosition() + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                DOM.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, 10);

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Check initial state
}

// ========================================
// MOBILE MENU
// ========================================

function initMobileMenu() {
    DOM.hamburger.addEventListener('click', () => {
        DOM.hamburger.classList.toggle('active');
        DOM.navMenu.classList.toggle('active');
        document.body.style.overflow = DOM.navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', () => {
            DOM.hamburger.classList.remove('active');
            DOM.navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on resize
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 768) {
            DOM.hamburger.classList.remove('active');
            DOM.navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 100));
}

// ========================================
// SMOOTH SCROLLING
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = DOM.navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// THEME TOGGLE
// ========================================

function initThemeToggle() {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (!systemPrefersDark) {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    DOM.themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add subtle animation
        DOM.themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            DOM.themeToggle.style.transform = '';
        }, 150);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

function revealOnScroll() {
    DOM.revealElements.forEach(element => {
        if (isInViewport(element, CONFIG.revealOffset)) {
            element.classList.add('active');
        }
    });
}

function initScrollReveal() {
    window.addEventListener('scroll', debounce(revealOnScroll, 10));
    // Trigger immediately for elements already in view
    revealOnScroll();
}

// ========================================
// SKILL BAR ANIMATIONS
// ========================================

function animateSkillBars() {
    DOM.skillItems.forEach(item => {
        if (isInViewport(item, 100) && !item.classList.contains('animated')) {
            item.classList.add('animated');
        }
    });
}

function initSkillBars() {
    window.addEventListener('scroll', debounce(animateSkillBars, 10));
    animateSkillBars(); // Check initial state
}

// ========================================
// COUNTER ANIMATION
// ========================================

function animateCounter(element, target, duration) {
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

function initCounters() {
    let animated = false;
    
    const checkCounters = () => {
        if (animated) return;
        
        DOM.statNumbers.forEach(stat => {
            if (isInViewport(stat, 100)) {
                animated = true;
                const target = parseInt(stat.getAttribute('data-count'), 10);
                animateCounter(stat, target, CONFIG.counterDuration);
            }
        });
    };
    
    window.addEventListener('scroll', debounce(checkCounters, 10));
    checkCounters(); // Check initial state
}

// ========================================
// FORM VALIDATION & SUBMISSION
// ========================================

function initContactForm() {
    if (!DOM.contactForm) return;

    const formFields = {
        name: {
            element: document.getElementById('name'),
            errorElement: document.getElementById('name-error'),
            validate: (value) => {
                if (!value.trim()) return 'Name is required';
                if (value.trim().length < 2) return 'Name must be at least 2 characters';
                return '';
            }
        },
        email: {
            element: document.getElementById('email'),
            errorElement: document.getElementById('email-error'),
            validate: (value) => {
                if (!value.trim()) return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email';
                return '';
            }
        },
        subject: {
            element: document.getElementById('subject'),
            errorElement: document.getElementById('subject-error'),
            validate: (value) => {
                if (!value.trim()) return 'Subject is required';
                if (value.trim().length < 3) return 'Subject must be at least 3 characters';
                return '';
            }
        },
        message: {
            element: document.getElementById('message'),
            errorElement: document.getElementById('message-error'),
            validate: (value) => {
                if (!value.trim()) return 'Message is required';
                if (value.trim().length < 10) return 'Message must be at least 10 characters';
                return '';
            }
        }
    };

    // Real-time validation
    Object.keys(formFields).forEach(fieldName => {
        const field = formFields[fieldName];
        
        field.element.addEventListener('blur', () => {
            validateField(field);
        });
        
        field.element.addEventListener('input', () => {
            if (field.element.parentElement.classList.contains('error')) {
                validateField(field);
            }
        });
    });

    function validateField(field) {
        const error = field.validate(field.element.value);
        
        if (error) {
            field.element.parentElement.classList.add('error');
            field.errorElement.textContent = error;
            return false;
        } else {
            field.element.parentElement.classList.remove('error');
            field.errorElement.textContent = '';
            return true;
        }
    }

    function validateForm() {
        let isValid = true;
        
        Object.keys(formFields).forEach(fieldName => {
            if (!validateField(formFields[fieldName])) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    function showStatus(type, message) {
        DOM.formStatus.textContent = message;
        DOM.formStatus.className = `form-status show ${type}`;
        
        setTimeout(() => {
            DOM.formStatus.classList.remove('show');
        }, 5000);
    }

    // Form submission
    DOM.contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            showStatus('error', 'Please fix the errors above');
            return;
        }

        const submitBtn = DOM.contactForm.querySelector('.btn-submit');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            
            showStatus('success', 'Message sent successfully! I\'ll get back to you soon.');
            
            // Reset form after delay
            setTimeout(() => {
                DOM.contactForm.reset();
                submitBtn.classList.remove('success');
                submitBtn.disabled = false;
            }, 3000);
            
        } catch (error) {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            showStatus('error', 'Something went wrong. Please try again.');
        }
    });
}

// ========================================
// TYPING EFFECT (Optional Enhancement)
// ========================================

function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const roles = ['Full-Stack Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Creative Coder'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing after loader
    setTimeout(type, CONFIG.loaderDelay + 1000);
}

// ========================================
// PARALLAX EFFECT (Subtle)
// ========================================

function initParallax() {
    const heroGlow = document.querySelector('.hero-glow');
    if (!heroGlow) return;

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        
        heroGlow.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px)`;
    });
}

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

function initAccessibility() {
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Close mobile menu with Escape
        if (e.key === 'Escape') {
            DOM.hamburger.classList.remove('active');
            DOM.navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Add focus styles for keyboard navigation
    document.body.addEventListener('keyup', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.body.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

function initLazyLoading() {
    // Lazy load images if any are added later
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ========================================
// INITIALIZE ALL FEATURES
// ========================================

function init() {
    initLoader();
    initNavbar();
    initActiveSection();
    initMobileMenu();
    initSmoothScroll();
    initThemeToggle();
    initScrollReveal();
    initSkillBars();
    initCounters();
    initContactForm();
    initTypingEffect();
    initParallax();
    initAccessibility();
    initLazyLoading();
}

// Start the application
document.addEventListener('DOMContentLoaded', init);

// ========================================
// CONSOLE GREETING
// ========================================

console.log(
    '%c👋 Hello there, curious developer!',
    'color: #3b82f6; font-size: 16px; font-weight: bold;'
);
console.log(
    '%cIf you\'re interested in the code behind this portfolio, feel free to explore!',
    'color: #a1a1aa; font-size: 12px;'
);
