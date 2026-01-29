/**
 * ============================================
 * PIXEL GATE - Main JavaScript
 * A World-Class Media House
 * ============================================
 */

// ============================================
// 1. GLOBAL VARIABLES
// ============================================
let currentLang = 'en';
let currentFilter = 'all';
let currentLightboxIndex = 0;
let filteredGallery = [];

// Gallery Data (Placeholder images - replace with actual project images)
const galleryData = [
    {
        category: 'photography',
        title: { en: 'Commercial Photography', ar: 'التصوير التجاري' },
        description: { en: 'High-end advertising campaign', ar: 'حملة إعلانية عالية الجودة' },
        image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800'
    },
    {
        category: 'photography',
        title: { en: 'Corporate Portraits', ar: 'البورتريه المؤسسي' },
        description: { en: 'Executive headshots', ar: 'صور رسمية للمديرين' },
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800'
    },
    {
        category: 'photography',
        title: { en: 'Architectural Photography', ar: 'تصوير العمارة' },
        description: { en: 'Industrial complex documentation', ar: 'توثيق المجمعات الصناعية' },
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
    },
    {
        category: 'photography',
        title: { en: 'Food Styling', ar: 'تصوير الأطعمة' },
        description: { en: 'Culinary art photography', ar: 'فن تصوير الطهي' },
        image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800'
    },
    {
        category: 'video',
        title: { en: 'TV Commercial', ar: 'إعلان تلفزيوني' },
        description: { en: 'Brand storytelling', ar: 'قصص العلامة التجارية' },
        image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800'
    },
    {
        category: 'video',
        title: { en: 'Corporate Documentary', ar: 'وثائقي مؤسسي' },
        description: { en: 'Company legacy film', ar: 'فيلم إرث الشركة' },
        image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800'
    },
    {
        category: 'video',
        title: { en: 'Motion Graphics', ar: 'موشن جرافيك' },
        description: { en: 'Animated explainer', ar: 'فيديو توضيحي متحرك' },
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800'
    },
    {
        category: 'events',
        title: { en: 'Corporate Summit', ar: 'قمة الشركات' },
        description: { en: 'International conference', ar: 'مؤتمر دولي' },
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
    },
    {
        category: 'events',
        title: { en: 'Live Broadcasting', ar: 'البث المباشر' },
        description: { en: 'Multi-camera production', ar: 'إنتاج متعدد الكاميرات' },
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800'
    },
    {
        category: 'events',
        title: { en: 'Award Ceremony', ar: 'حفل توزيع الجوائز' },
        description: { en: 'Full event management', ar: 'إدارة كاملة للحدث' },
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800'
    },
    {
        category: 'photography',
        title: { en: 'Aerial Imaging', ar: 'التصوير الجوي' },
        description: { en: 'Drone photography', ar: 'تصوير بالدرون' },
        image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800'
    },
    {
        category: 'photography',
        title: { en: 'Product Photography', ar: 'تصوير المنتجات' },
        description: { en: 'E-commerce ready', ar: 'جاهز للتجارة الإلكترونية' },
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'
    }
];

// Typewriter words
const typewriterWords = {
    en: [
        'Commercial Photography',
        'Cinematic Video Production',
        'Event Management',
        'Aerial Imaging',
        'Corporate Portraits',
        'Media Consultancy'
    ],
    ar: [
        'التصوير التجاري',
        'الإنتاج السينمائي',
        'إدارة الفعاليات',
        'التصوير الجوي',
        'البورتريه المؤسسي',
        'الاستشارات الإعلامية'
    ]
};

// ============================================
// 2. INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    initGallery();
    initNavigation();
    initScrollEffects();
    initLightbox();
    initLanguageToggle();
    initParallax();
    initTypewriter();
});

// ============================================
// 3. LANGUAGE TOGGLE
// ============================================
function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    const langText = langToggle.querySelector('.lang-text');

    langToggle.addEventListener('click', function () {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        langText.textContent = currentLang === 'en' ? 'AR' : 'EN';

        // Toggle RTL
        document.body.classList.toggle('rtl', currentLang === 'ar');
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

        // Update all text content
        updateTextContent();

        // Re-render gallery with new language
        renderGallery(currentFilter);
    });
}

function updateTextContent() {
    // Update all elements with data-en and data-ar attributes
    const elements = document.querySelectorAll('[data-en][data-ar]');

    elements.forEach(el => {
        const text = currentLang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-ar');
        if (text) {
            el.textContent = text;
        }
    });
}

// ============================================
// 4. NAVIGATION
// ============================================
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Dynamic Logo - transforms to arrow on scroll
    const dynamicLogo = document.getElementById('dynamicLogo');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            dynamicLogo.classList.add('scrolled');
        } else {
            dynamicLogo.classList.remove('scrolled');
        }
    });

    // Click to scroll to top
    dynamicLogo.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// 5. SCROLL EFFECTS
// ============================================
function initScrollEffects() {
    // Intersection Observer for section animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// ============================================
// 6. GALLERY
// ============================================
function initGallery() {
    renderGallery('all');

    // Gallery filters
    document.querySelectorAll('.gallery-filter').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.gallery-filter').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            currentFilter = filter;
            renderGallery(filter);
        });
    });
}

function renderGallery(filter) {
    const grid = document.getElementById('galleryGrid');
    grid.innerHTML = '';

    filteredGallery = filter === 'all'
        ? galleryData
        : galleryData.filter(item => item.category === filter);

    filteredGallery.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.animationDelay = `${index * 0.1}s`;

        const title = currentLang === 'en' ? item.title.en : item.title.ar;
        const description = currentLang === 'en' ? item.description.en : item.description.ar;
        const categoryLabel = getCategoryLabel(item.category);

        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${title}" loading="lazy">
            <span class="gallery-category">${categoryLabel}</span>
            <div class="gallery-overlay">
                <h4>${title}</h4>
                <p>${description}</p>
            </div>
        `;

        galleryItem.addEventListener('click', () => openLightbox(index));
        grid.appendChild(galleryItem);
    });
}

function getCategoryLabel(category) {
    const labels = {
        photography: { en: 'Photography', ar: 'تصوير' },
        video: { en: 'Video', ar: 'فيديو' },
        events: { en: 'Events', ar: 'فعاليات' }
    };
    return currentLang === 'en' ? labels[category].en : labels[category].ar;
}

// ============================================
// 7. LIGHTBOX
// ============================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);

    // Close on background click
    lightbox.addEventListener('click', function (e) {
        if (e.target === this) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });
}

function openLightbox(index) {
    currentLightboxIndex = index;
    const item = filteredGallery[index];
    const lightbox = document.getElementById('lightbox');
    const content = document.getElementById('lightboxContent');

    const title = currentLang === 'en' ? item.title.en : item.title.ar;
    const description = currentLang === 'en' ? item.description.en : item.description.ar;

    content.innerHTML = `
        <img src="${item.image}" alt="${title}">
        <div class="lightbox-info">
            <h4>${title}</h4>
            <p>${description}</p>
        </div>
    `;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function nextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredGallery.length;
    openLightbox(currentLightboxIndex);
}

function prevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredGallery.length) % filteredGallery.length;
    openLightbox(currentLightboxIndex);
}

// ============================================
// 8. PARALLAX EFFECT
// ============================================
function initParallax() {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', function (e) {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
    });

    function animateParallax() {
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        const orbs = document.querySelectorAll('.glow-orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 30;
            orb.style.transform = `translate(${currentX * speed}px, ${currentY * speed}px)`;
        });

        requestAnimationFrame(animateParallax);
    }

    animateParallax();
}

// ============================================
// 9. CONTACT INFO COPY (Optional Enhancement)
// ============================================
function initContactCopy() {
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', function () {
            const textEl = this.querySelector('.contact-text p');
            if (textEl) {
                const text = textEl.textContent.trim();
                navigator.clipboard.writeText(text).then(() => {
                    // Show feedback
                    const originalText = textEl.textContent;
                    textEl.textContent = currentLang === 'en' ? 'Copied!' : 'تم النسخ!';
                    setTimeout(() => {
                        textEl.textContent = originalText;
                    }, 2000);
                });
            }
        });
    });
}

// ============================================
// 10. TYPEWRITER EFFECT
// ============================================
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const words = typewriterWords[currentLang];
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// ============================================
// 11. UTILITIES
// ============================================

// Debounce function for performance
function debounce(func, wait) {
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
