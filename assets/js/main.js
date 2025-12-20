// DOM Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const mobileHeaderBtn = document.querySelector('.mobile-header .mobile-menu-btn');
    
    // Mobile header menu button
    if (mobileHeaderBtn) {
        mobileHeaderBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Desktop menu button
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Close menu when clicking overlay
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }
    
    // Close menu when clicking a nav link (for mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
    
    // Hero Slider
    const heroSlides = document.querySelectorAll('.slide');
    const slideIndicators = document.querySelector('.slide-indicators');
    let currentSlide = 0;
    let slideInterval;
    
    if (heroSlides.length > 0) {
        // Create indicators
        heroSlides.forEach((slide, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('slide-indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            if (slideIndicators) {
                slideIndicators.appendChild(indicator);
            }
        });
        
        // Auto slide function
        function autoSlide() {
            if (heroSlides.length <= 1) return;
            
            heroSlides[currentSlide].classList.remove('active');
            const indicators = document.querySelectorAll('.slide-indicator');
            if (indicators[currentSlide]) {
                indicators[currentSlide].classList.remove('active');
            }
            
            currentSlide = (currentSlide + 1) % heroSlides.length;
            
            heroSlides[currentSlide].classList.add('active');
            if (indicators[currentSlide]) {
                indicators[currentSlide].classList.add('active');
            }
        }
        
        // Manual slide function
        function goToSlide(index) {
            heroSlides[currentSlide].classList.remove('active');
            const indicators = document.querySelectorAll('.slide-indicator');
            if (indicators[currentSlide]) {
                indicators[currentSlide].classList.remove('active');
            }
            
            currentSlide = index;
            
            heroSlides[currentSlide].classList.add('active');
            if (indicators[currentSlide]) {
                indicators[currentSlide].classList.add('active');
            }
            
            // Reset auto slide timer
            clearInterval(slideInterval);
            startAutoSlide();
        }
        
        // Start auto slide
        function startAutoSlide() {
            if (heroSlides.length > 1) {
                slideInterval = setInterval(autoSlide, 5000);
            }
        }
        
        // Pause on hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            heroSection.addEventListener('mouseleave', () => {
                startAutoSlide();
            });
        }
        
        startAutoSlide();
    }
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialIndicators = document.querySelector('.testimonial-indicators');
    let currentTestimonial = 0;
    let testimonialInterval;
    
    if (testimonials.length > 0) {
        // Create indicators
        testimonials.forEach((testimonial, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('testimonial-indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToTestimonial(index));
            if (testimonialIndicators) {
                testimonialIndicators.appendChild(indicator);
            }
        });
        
        // Auto slide function
        function autoTestimonial() {
            if (testimonials.length <= 1) return;
            
            testimonials[currentTestimonial].classList.remove('active');
            const indicators = document.querySelectorAll('.testimonial-indicator');
            if (indicators[currentTestimonial]) {
                indicators[currentTestimonial].classList.remove('active');
            }
            
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            
            testimonials[currentTestimonial].classList.add('active');
            if (indicators[currentTestimonial]) {
                indicators[currentTestimonial].classList.add('active');
            }
        }
        
        // Manual slide function
        function goToTestimonial(index) {
            testimonials[currentTestimonial].classList.remove('active');
            const indicators = document.querySelectorAll('.testimonial-indicator');
            if (indicators[currentTestimonial]) {
                indicators[currentTestimonial].classList.remove('active');
            }
            
            currentTestimonial = index;
            
            testimonials[currentTestimonial].classList.add('active');
            if (indicators[currentTestimonial]) {
                indicators[currentTestimonial].classList.add('active');
            }
            
            // Reset auto slide timer
            clearInterval(testimonialInterval);
            startTestimonialAutoSlide();
        }
        
        // Start auto slide
        function startTestimonialAutoSlide() {
            if (testimonials.length > 1) {
                testimonialInterval = setInterval(autoTestimonial, 4000);
            }
        }
        
        startTestimonialAutoSlide();
    }
    
    // Products Tabs
    const productTabs = document.querySelectorAll('.product-tab');
    const productSections = document.querySelectorAll('.product-section');
    
    if (productTabs.length > 0) {
        productTabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all tabs and sections
                productTabs.forEach(t => t.classList.remove('active'));
                productSections.forEach(s => s.classList.remove('active-product'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show corresponding section
                const productId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(productId);
                if (targetSection) {
                    targetSection.classList.add('active-product');
                    
                    // Scroll to section smoothly if not mobile
                    if (window.innerWidth > 768) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
    
    // Contact Form Tabs
    const formTabs = document.querySelectorAll('.form-tab');
    const contactForms = document.querySelectorAll('.contact-form');
    
    if (formTabs.length > 0) {
        formTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs and forms
                formTabs.forEach(t => t.classList.remove('active'));
                contactForms.forEach(f => f.classList.remove('active-form'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show corresponding form
                const formId = this.getAttribute('data-form');
                const targetForm = document.getElementById(`${formId}-form`);
                if (targetForm) {
                    targetForm.classList.add('active-form');
                }
            });
        });
    }
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }
    
    // Form Submission
    const contactFormsAll = document.querySelectorAll('form');
    
    contactFormsAll.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Simple validation
            let isValid = true;
            this.querySelectorAll('[required]').forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#f44336';
                } else {
                    input.style.borderColor = '#4caf50';
                }
            });
            
            if (isValid) {
                // Show success message
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                submitBtn.style.backgroundColor = '#4caf50';
                submitBtn.disabled = true;
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                    
                    // Reset border colors
                    this.querySelectorAll('input, select, textarea').forEach(input => {
                        input.style.borderColor = '';
                    });
                }, 3000);
                
                // In a real application, you would send the form data to a server here
                console.log('Form submitted:', formValues);
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        mobileOverlay.classList.remove('active');
                        document.body.classList.remove('no-scroll');
                    }
                    
                    // Scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(5px)';
        } else {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
            navbar.style.backgroundColor = 'var(--bg-white)';
            navbar.style.backdropFilter = 'none';
        }
    });
    
    // Support system hover
    const supportSystem = document.querySelector('.support-system');
    const supportPanel = document.querySelector('.support-panel');
    
    if (supportSystem && supportPanel) {
        // Show on hover
        supportSystem.addEventListener('mouseenter', function() {
            supportPanel.style.opacity = '1';
            supportPanel.style.visibility = 'visible';
            supportPanel.style.transform = 'translateY(0)';
        });
        
        // Hide when mouse leaves
        supportSystem.addEventListener('mouseleave', function() {
            supportPanel.style.opacity = '0';
            supportPanel.style.visibility = 'hidden';
            supportPanel.style.transform = 'translateY(10px)';
        });
    }
    
    // Mobile contact button
    const mobileContactBtn = document.querySelector('.mobile-contact-btn');
    if (mobileContactBtn) {
        mobileContactBtn.addEventListener('click', function() {
            window.location.href = 'contact.html';
        });
    }
    
    // WhatsApp functionality
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp, a[href*="wa.me"], a[href*="whatsapp"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Allow default behavior for WhatsApp links
            if (this.href.includes('wa.me') || this.href.includes('whatsapp')) {
                return true;
            }
            
            e.preventDefault();
            const message = encodeURIComponent("Hello! I'm interested in SmartTrail Axora services. Can you help me?");
            window.open(`https://wa.me/254113547613?text=${message}`, '_blank');
        });
    });
    
    // Add current year to footer
    const yearSpan = document.querySelector('#current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Add no-scroll class to body when mobile menu is open
const style = document.createElement('style');
style.textContent = `
    body.no-scroll {
        overflow: hidden;
    }
`;
document.head.appendChild(style);