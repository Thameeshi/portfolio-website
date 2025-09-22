// Enhanced Portfolio JavaScript for Multiple Projects with Lightbox

// Store current image index for each project
let currentImageIndices = [];
let rotationIntervals = [];
let lightboxData = [];
let currentLightboxIndex = 0;

// Initialize project image functionality
function initializeProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    currentImageIndices = new Array(projectCards.length).fill(0);
    rotationIntervals = new Array(projectCards.length).fill(null);
    
    // Build lightbox data from all project images
    buildLightboxData();
    
    // Add click listeners to all project images
    addImageClickListeners();
}

// Build lightbox data array with all images
function buildLightboxData() {
    lightboxData = [];
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, projectIndex) => {
        const projectTitle = card.querySelector('.project-info h3').textContent;
        const images = card.querySelectorAll('.project-img');
        
        images.forEach((img, imageIndex) => {
            lightboxData.push({
                src: img.src,
                alt: img.alt,
                caption: `${projectTitle} - Image ${imageIndex + 1}`,
                projectIndex: projectIndex,
                imageIndex: imageIndex
            });
        });
    });
}

// Add click listeners to project images
function addImageClickListeners() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, projectIndex) => {
        const images = card.querySelectorAll('.project-img');
        
        images.forEach((img, imageIndex) => {
            img.addEventListener('click', () => {
                // Find the global index of this image in lightboxData
                const globalIndex = lightboxData.findIndex(item => 
                    item.projectIndex === projectIndex && item.imageIndex === imageIndex
                );
                openLightbox(globalIndex);
            });
            
            // Add cursor pointer to indicate clickable
            img.style.cursor = 'pointer';
            
            // Add hover effect
            img.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05)';
                img.style.transition = 'transform 0.3s ease';
            });
            
            img.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });
        });
    });
}

// Lightbox functionality
function openLightbox(index) {
    if (index < 0 || index >= lightboxData.length) return;
    
    currentLightboxIndex = index;
    const modal = document.getElementById('lightboxModal');
    const image = document.getElementById('lightboxImage');
    const caption = document.getElementById('lightboxCaption');
    
    const data = lightboxData[currentLightboxIndex];
    image.src = data.src;
    image.alt = data.alt;
    caption.textContent = data.caption;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Stop all project rotations when lightbox is open
    stopAllRotations();
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Restart rotations after lightbox closes
    setTimeout(() => {
        startAllImageRotations();
    }, 500);
}

function nextLightboxImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % lightboxData.length;
    updateLightboxImage();
}

function prevLightboxImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + lightboxData.length) % lightboxData.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const image = document.getElementById('lightboxImage');
    const caption = document.getElementById('lightboxCaption');
    const data = lightboxData[currentLightboxIndex];
    
    // Add fade effect
    image.style.opacity = '0';
    
    setTimeout(() => {
        image.src = data.src;
        image.alt = data.alt;
        caption.textContent = data.caption;
        image.style.opacity = '1';
    }, 150);
}

// Initialize lightbox event listeners
function initializeLightbox() {
    const modal = document.getElementById('lightboxModal');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    
    // Close button
    closeBtn.addEventListener('click', closeLightbox);
    
    // Navigation buttons
    prevBtn.addEventListener('click', prevLightboxImage);
    nextBtn.addEventListener('click', nextLightboxImage);
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    prevLightboxImage();
                    break;
                case 'ArrowRight':
                    nextLightboxImage();
                    break;
            }
        }
    });
}

// Show specific image for a specific project
function showProjectImage(projectIndex, imageIndex) {
    const projectCard = document.querySelectorAll('.project-card')[projectIndex];
    if (!projectCard) return;
    
    const images = projectCard.querySelectorAll('.project-img');
    const dots = projectCard.querySelectorAll('.nav-dot');
    
    // Remove active class from all images and dots in this project
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current image and dot
    if (images[imageIndex] && dots[imageIndex]) {
        images[imageIndex].classList.add('active');
        dots[imageIndex].classList.add('active');
    }
    
    currentImageIndices[projectIndex] = imageIndex;
}

// Stop all rotations
function stopAllRotations() {
    rotationIntervals.forEach((interval, index) => {
        if (interval) {
            clearInterval(interval);
            rotationIntervals[index] = null;
        }
    });
}

// Start image rotation for all projects
function startAllImageRotations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((projectCard, projectIndex) => {
        const images = projectCard.querySelectorAll('.project-img');
        
        // Only start rotation if there are multiple images and no existing interval
        if (images.length > 1 && !rotationIntervals[projectIndex]) {
            rotationIntervals[projectIndex] = setInterval(() => {
                const nextIndex = (currentImageIndices[projectIndex] + 1) % images.length;
                showProjectImage(projectIndex, nextIndex);
            }, 4000 + (projectIndex * 500)); // Stagger the rotations
        }
    });
}

// Stop rotation for a specific project
function stopProjectRotation(projectIndex) {
    if (rotationIntervals[projectIndex]) {
        clearInterval(rotationIntervals[projectIndex]);
        rotationIntervals[projectIndex] = null;
    }
}

// Start rotation for a specific project
function startProjectRotation(projectIndex) {
    const projectCard = document.querySelectorAll('.project-card')[projectIndex];
    if (!projectCard) return;
    
    const images = projectCard.querySelectorAll('.project-img');
    if (images.length > 1 && !rotationIntervals[projectIndex]) {
        rotationIntervals[projectIndex] = setInterval(() => {
            const nextIndex = (currentImageIndices[projectIndex] + 1) % images.length;
            showProjectImage(projectIndex, nextIndex);
        }, 4000 + (projectIndex * 500));
    }
}

// Add hover listeners for all projects
function addProjectHoverListeners() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((projectCard, projectIndex) => {
        // Pause rotation on hover
        projectCard.addEventListener('mouseenter', () => {
            stopProjectRotation(projectIndex);
        });
        
        // Resume rotation on mouse leave
        projectCard.addEventListener('mouseleave', () => {
            setTimeout(() => {
                startProjectRotation(projectIndex);
            }, 2000); // Resume after 2 seconds
        });
        
        // Add click events to nav dots
        const dots = projectCard.querySelectorAll('.nav-dot');
        dots.forEach((dot, imageIndex) => {
            dot.addEventListener('click', () => {
                stopProjectRotation(projectIndex);
                showProjectImage(projectIndex, imageIndex);
                setTimeout(() => {
                    startProjectRotation(projectIndex);
                }, 3000); // Restart after 3 seconds
            });
        });
    });
}

// Mobile menu functionality
const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');

function toggleMobileMenu() {
    navbar.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navbar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Add click event to hamburger
if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
}

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close mobile menu if open
            navbar.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
            
            // Smooth scroll with offset for fixed header
            const headerHeight = 80;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Header background and active section detection on scroll
let ticking = false;

function updateOnScroll() {
    const header = document.getElementById('header');
    const scrollY = window.scrollY;
    
    // Header background
    if (scrollY > 100) {
        header.style.background = 'rgba(15, 4, 45, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 2px 20px rgba(14, 239, 255, 0.1)';
    } else {
        header.style.background = 'transparent';
        header.style.backdropFilter = 'none';
        header.style.boxShadow = 'none';
    }
    
    // Active section detection
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Contact form handling with enhanced validation and UX
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Clear previous errors
        clearFormErrors();
        
        try {
            const response = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    subject: formData.get('subject'),
                    message: formData.get('message')
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                showNotification(result.message, 'success');
                this.reset();
                
                // Add success animation
                submitBtn.classList.add('success');
                setTimeout(() => submitBtn.classList.remove('success'), 2000);
            } else {
                showNotification(result.message, 'error');
                
                // Add error animation
                submitBtn.classList.add('error');
                setTimeout(() => submitBtn.classList.remove('error'), 2000);
            }
            
        } catch (error) {
            console.error('Contact form error:', error);
            showNotification('Network error. Please check your connection and try again.', 'error');
            
            submitBtn.classList.add('error');
            setTimeout(() => submitBtn.classList.remove('error'), 2000);
        }
        
        // Reset button state
        setTimeout(() => {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }, 1000);
    });
}

// Form validation helpers
function clearFormErrors() {
    document.querySelectorAll('.form-error').forEach(error => error.remove());
    document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.parentElement;
    
    field.classList.add('error');
    
    const errorElement = document.createElement('span');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    
    formGroup.appendChild(errorElement);
}

// Enhanced notification system
function showNotification(message, type = 'info', duration = 5000) {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Create notification content
    notification.innerHTML = `
        <div class="notification-content">
            <i class="notification-icon fas ${getNotificationIcon(type)}"></i>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, duration);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate skill cards with stagger
            if (entry.target.classList.contains('skills-grid')) {
                const cards = entry.target.querySelectorAll('.skill-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, index * 100);
                });
            }
            
            // Animate project cards with stagger
            if (entry.target.classList.contains('projects-grid')) {
                const cards = entry.target.querySelectorAll('.project-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, index * 200);
                });
            }
        }
    });
}, observerOptions);

// Initialize animations on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading overlay
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.classList.add('fade-out');
            setTimeout(() => loadingOverlay.remove(), 500);
        }, 1000);
    }
    
    // Initialize projects
    initializeProjects();
    
    // Initialize lightbox
    initializeLightbox();
    
    // Start image rotations
    setTimeout(() => {
        startAllImageRotations();
    }, 1000);
    
    // Add hover listeners
    addProjectHoverListeners();
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.skill-card, .project-card, .contact-item, .about-content, .skills-grid, .projects-grid'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });
    
    // Keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navbar.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Smooth reveal of home section
    setTimeout(() => {
        document.querySelector('.home').classList.add('loaded');
    }, 500);
});

// Performance optimization
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize
        if (window.innerWidth > 768 && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250);
});

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        '/images/home.png',
        '/images/ss1.jpg',
        '/images/ss2.jpg',
        '/images/ss3.jpg',
        '/images/project1.jpg',
        '/images/project2.jpg',
        '/images/project3.jpg',
        '/images/project4.jpg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
        img.onerror = () => console.log(`Failed to preload: ${url}`);
    });
}

// Call preload after page load
window.addEventListener('load', preloadImages);

// Add CSS classes for animations and notifications
const style = document.createElement('style');
style.textContent = `
    /* Loading overlay */
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0F042D;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }
    
    .loading-overlay.fade-out {
        opacity: 0;
        pointer-events: none;
    }
    
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid rgba(14, 239, 255, 0.3);
        border-top: 3px solid #0ef;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    /* Notifications */
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 350px;
        padding: 0;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 1000;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    
    .notification.success {
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
    }
    
    .notification.error {
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
    }
    
    .notification.warning {
        background: linear-gradient(135deg, #f59e0b, #d97706);
        color: white;
    }
    
    .notification.info {
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        color: white;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        padding: 16px 20px;
        gap: 12px;
    }
    
    .notification-icon {
        font-size: 18px;
        flex-shrink: 0;
    }
    
    .notification-message {
        flex: 1;
        font-weight: 500;
        line-height: 1.4;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: rgba(255,255,255,0.8);
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: background 0.2s;
    }
    
    .notification-close:hover {
        background: rgba(255,255,255,0.1);
        color: white;
    }
    
    /* Animation classes */
    .animate-ready {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .home.loaded .home-content {
        animation: slideInLeft 1s ease;
    }
    
    .home.loaded .image {
        animation: slideInRight 1s ease;
    }
    
    /* Button states */
    .btn-box.loading {
        opacity: 0.7;
        transform: scale(0.98);
    }
    
    .btn-box.success {
        background: #10b981 !important;
        box-shadow: 0 0 20px #10b981;
    }
    
    .btn-box.error {
        background: #ef4444 !important;
        box-shadow: 0 0 20px #ef4444;
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    /* Form errors */
    .form-error {
        color: #ef4444;
        font-size: 12px;
        margin-top: 5px;
        display: block;
    }
    
    .form-group input.error,
    .form-group textarea.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);
    }
    
    /* Mobile menu */
    .hamburger {
        display: none;
        flex-direction: column;
        cursor: pointer;
        padding: 5px;
        z-index: 101;
    }
    
    .hamburger span {
        width: 25px;
        height: 3px;
        background: #0ef;
        margin: 3px 0;
        transition: 0.3s;
        border-radius: 2px;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
    }
    
    @media (max-width: 768px) {
        .hamburger {
            display: flex;
        }
        
        .navbar {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            height: 100vh;
            background: rgba(15, 4, 45, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: 0.3s;
            margin-right: 0;
        }
        
        .navbar.active {
            right: 0;
        }
        
        .navbar a {
            font-size: 20px;
            margin: 20px 0;
            opacity: 0;
            transform: translateX(50px);
            transition: 0.3s ease;
        }
        
        .navbar.active a {
            opacity: 1;
            transform: translateX(0);
        }
        
        .navbar.active a:nth-child(1) { transition-delay: 0.1s; }
        .navbar.active a:nth-child(2) { transition-delay: 0.2s; }
        .navbar.active a:nth-child(3) { transition-delay: 0.3s; }
        .navbar.active a:nth-child(4) { transition-delay: 0.4s; }
        .navbar.active a:nth-child(5) { transition-delay: 0.5s; }
    }
`;
document.head.appendChild(style);
