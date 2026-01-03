// DOM Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // ===== UPDATE COPYRIGHT YEAR =====
    function updateCopyrightYear() {
        const currentYear = new Date().getFullYear();
        
        // Find all footer copyright elements
        const copyrightElements = document.querySelectorAll('.footer-bottom p');
        
        copyrightElements.forEach(element => {
            const currentText = element.textContent;
            // Replace any 4-digit year with current year
            const updatedText = currentText.replace(/\b20\d{2}\b/, currentYear);
            element.textContent = updatedText;
        });
        
        // Also update any other copyright elements you might have
        const allCopyrightElements = document.querySelectorAll('[class*="copyright"], [class*="Copyright"]');
        allCopyrightElements.forEach(element => {
            const currentText = element.textContent;
            const updatedText = currentText.replace(/\b20\d{2}\b/, currentYear);
            element.textContent = updatedText;
        });
    }
    
    // Run copyright year update
    updateCopyrightYear();
    
    // ===== MOBILE MENU TOGGLE - FIXED =====
    const mobileMenuBtns = document.querySelectorAll('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    
    // Handle all mobile menu buttons
    mobileMenuBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Toggle menu
            navMenu.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
            
            // Toggle hamburger animation
            this.classList.toggle('active');
        });
    });
    
    // Close menu when clicking overlay
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Reset hamburger buttons
            mobileMenuBtns.forEach(btn => {
                btn.classList.remove('active');
            });
        });
    }
    
    // Close menu when clicking a nav link (for mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
                
                // Reset hamburger buttons
                mobileMenuBtns.forEach(btn => {
                    btn.classList.remove('active');
                });
            }
        });
    });
    
    // ===== MOBILE CONTACT BUTTON TOGGLE - FIXED =====
    const mobileContactBtn = document.querySelector('.mobile-contact-btn');
    const supportPanel = document.querySelector('.support-panel');
    
    if (mobileContactBtn && supportPanel) {
        mobileContactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle contact panel
            const isPanelVisible = supportPanel.classList.contains('active');
            
            if (isPanelVisible) {
                // Close the panel
                supportPanel.classList.remove('active');
                this.classList.remove('active');
            } else {
                // Open the panel
                supportPanel.classList.add('active');
                this.classList.add('active');
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileOverlay.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                    mobileMenuBtns.forEach(btn => btn.classList.remove('active'));
                }
            }
        });
    }
    
    // Close support panel when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            supportPanel && 
            supportPanel.classList.contains('active') &&
            !e.target.closest('.support-system') && 
            !e.target.closest('.mobile-contact-btn')) {
            
            supportPanel.classList.remove('active');
            if (mobileContactBtn) {
                mobileContactBtn.classList.remove('active');
            }
        }
    });
    
    // Close support panel on window resize if on desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && supportPanel) {
            supportPanel.classList.remove('active');
            if (mobileContactBtn) {
                mobileContactBtn.classList.remove('active');
            }
        }
    });
    
    // ===== HERO SLIDER =====
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
    
    // ===== TESTIMONIAL SLIDER - UPDATED FOR 4 TESTIMONIALS =====
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialIndicators = document.querySelector('.testimonial-indicators');
    let currentTestimonial = 0;
    let testimonialInterval;
    
    if (testimonials.length > 0) {
        // Create indicators for all testimonials (including new e-commerce one)
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
    
    // ===== PRODUCTS TABS - UPDATED FOR 5 TABS (INCLUDING E-COMMERCE) =====
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
        
        // Handle URL hash on page load for direct linking to specific product
        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            const targetTab = document.querySelector(`.product-tab[href="#${hash}"]`);
            const targetSection = document.getElementById(hash);
            
            if (targetTab && targetSection) {
                // Remove active class from all tabs and sections
                productTabs.forEach(t => t.classList.remove('active'));
                productSections.forEach(s => s.classList.remove('active-product'));
                
                // Add active class to target tab and section
                targetTab.classList.add('active');
                targetSection.classList.add('active-product');
                
                // Scroll to section on page load
                setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        }
    }
    
    // ===== CONTACT FORM TABS =====
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
    
    // ===== FAQ ACCORDION =====
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
    
    // ===== FORM SUBMISSION - WITH E-COMMERCE SUPPORT =====
    const contactFormsAll = document.querySelectorAll('form');
    
    contactFormsAll.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Determine which form was submitted
            const formName = this.getAttribute('id') || 'contact-form';
            const isEcommerceForm = formName.includes('ecommerce') || 
                                   form.querySelector('[name*="ecommerce"]') || 
                                   form.querySelector('[name*="Ecovera"]');
            
            // Custom success message based on form type
            let successMessage = 'Sent Successfully!';
            if (isEcommerceForm) {
                successMessage = 'E-commerce inquiry sent! We\'ll contact you soon.';
            }
            
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
                const originalBgColor = submitBtn.style.backgroundColor;
                
                submitBtn.innerHTML = `<i class="fas fa-check"></i> ${successMessage}`;
                submitBtn.style.backgroundColor = '#4caf50';
                submitBtn.disabled = true;
                
                // Add e-commerce specific tracking
                if (isEcommerceForm) {
                    console.log('E-commerce inquiry submitted:', formValues);
                    // You can add e-commerce specific analytics here
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'ecommerce_inquiry', {
                            'event_category': 'form_submission',
                            'event_label': 'ecommerce'
                        });
                    }
                } else {
                    console.log('Form submitted:', formValues);
                }
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = originalBgColor;
                    submitBtn.disabled = false;
                    
                    // Reset border colors
                    this.querySelectorAll('input, select, textarea').forEach(input => {
                        input.style.borderColor = '';
                    });
                }, 3000);
            }
        });
    });
    
    // ===== SMOOTH SCROLLING - INCLUDING E-COMMERCE SECTION =====
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
                        mobileMenuBtns.forEach(btn => btn.classList.remove('active'));
                    }
                    
                    // Close support panel on mobile
                    if (window.innerWidth <= 768 && supportPanel) {
                        supportPanel.classList.remove('active');
                        if (mobileContactBtn) {
                            mobileContactBtn.classList.remove('active');
                        }
                    }
                    
                    // If clicking on e-commerce link from index page
                    if (href === '#ecommerce' && window.location.pathname.includes('index.html')) {
                        // Redirect to products page with e-commerce hash
                        window.location.href = 'products.html#ecommerce';
                        return;
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
    
    // ===== NAVBAR SCROLL EFFECT =====
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
    
    // ===== SUPPORT SYSTEM DESKTOP HOVER =====
    const supportSystem = document.querySelector('.support-system');
    
    if (supportSystem && supportPanel && window.innerWidth > 768) {
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
    
    // ===== WHATSAPP FUNCTIONALITY - WITH E-COMMERCE OPTION =====
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp, a[href*="wa.me"], a[href*="whatsapp"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Check if this is an e-commerce specific button
            const isEcommerceBtn = this.classList.contains('btn-ecommerce') || 
                                  this.textContent.includes('E-commerce') || 
                                  this.closest('.product-section#ecommerce');
            
            // Allow default behavior for WhatsApp links
            if (this.href.includes('wa.me') || this.href.includes('whatsapp')) {
                return true;
            }
            
            e.preventDefault();
            
            // Custom message based on button context
            let message = "Hello! I'm interested in SmartTrail Axora services. Can you help me?";
            
            if (isEcommerceBtn) {
                message = "Hello! I'm interested in your E-commerce Solutions for my business. Can you tell me more about Ecovera?";
            } else if (this.classList.contains('btn-inquiry')) {
                message = "Hello! I have a question about SmartTrail Axora. Can you assist me?";
            }
            
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/254113547613?text=${encodedMessage}`, '_blank');
        });
    });
    
    // ===== ADD CURRENT YEAR TO FOOTER (Alternative method) =====
    function updateFooterCopyright() {
        const currentYear = new Date().getFullYear();
        const footerBottom = document.querySelector('.footer-bottom p');
        
        if (footerBottom) {
            // Check if it already has the year pattern
            const text = footerBottom.textContent;
            if (text.includes('202')) {
                // Replace any 4-digit year starting with 20
                footerBottom.textContent = text.replace(/\b20\d{2}\b/, currentYear);
            } else {
                // Add the year if not present
                footerBottom.textContent = `© ${currentYear} SmartTrail Axora. All rights reserved.`;
            }
        }
    }
    
    // Run footer copyright update
    updateFooterCopyright();
    
    // ===== E-COMMERCE SPECIFIC FUNCTIONALITY =====
    function initEcommerceFeatures() {
        // Add active state to e-commerce links in navigation
        const ecommerceLinks = document.querySelectorAll('a[href*="ecommerce"], a[href*="Ecovera"]');
        ecommerceLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Add visual feedback
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                // Track e-commerce click
                console.log('E-commerce link clicked:', this.href);
            });
        });
        
        // Handle e-commerce demo requests
        const ecommerceDemoBtns = document.querySelectorAll('.btn-ecommerce-demo, .product-section#ecommerce .btn-accent');
        ecommerceDemoBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (this.href && !this.href.includes('#') && !this.href.includes('javascript')) {
                    return true; // Allow normal link behavior
                }
                
                e.preventDefault();
                console.log('E-commerce demo requested');
                
                // Show a custom message or redirect to contact form
                const contactUrl = 'contact.html?interest=ecommerce';
                window.location.href = contactUrl;
            });
        });
        
        // Preload e-commerce images for better performance
        if (document.querySelector('.feature-card-ecommerce')) {
            const ecommerceImg = new Image();
            ecommerceImg.src = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
        }
    }
    
    // Initialize e-commerce features
    initEcommerceFeatures();
    
    // ===== LAZY LOAD IMAGES FOR BETTER PERFORMANCE =====
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Initialize lazy loading
    lazyLoadImages();
});

// Add no-scroll class to body when mobile menu is open
const style = document.createElement('style');
style.textContent = `
    body.no-scroll {
        overflow: hidden;
    }
    
    /* Add smooth transition for product tabs */
    .product-section {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    /* E-commerce specific animation */
    @keyframes ecommercePulse {
        0% { box-shadow: 0 0 0 0 rgba(128, 90, 213, 0.4); }
        70% { box-shadow: 0 0 0 10px rgba(128, 90, 213, 0); }
        100% { box-shadow: 0 0 0 0 rgba(128, 90, 213, 0); }
    }
    
    .feature-card-ecommerce:hover {
        animation: ecommercePulse 2s infinite;
    }
    
    /* Smooth scrolling for anchor links */
    html {
        scroll-behavior: smooth;
    }
    
    @media (prefers-reduced-motion: reduce) {
        html {
            scroll-behavior: auto;
        }
    }
`;
document.head.appendChild(style);