document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav__toggle');
    const navLinks = document.querySelector('.nav__links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.right = '0';
                navLinks.style.left = '0';
                navLinks.style.backgroundColor = 'var(--color-background)';
                navLinks.style.padding = '20px';
                navLinks.style.borderTop = '1px solid var(--color-border)';
                navLinks.style.zIndex = '1000';
            }
            
            // Toggle animation for the hamburger icon
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // Ensure all CTA buttons work
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Just to ensure the link works, we'll explicitly navigate
            window.open(this.getAttribute('href'), '_blank');
        });
    });
    
    // Animated statistics counter
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number, .stats__number');
        
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const duration = 2000; // Animation duration in milliseconds
            const step = target / duration * 10;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += step;
                    if (current > target) current = target;
                    
                    // Format the number based on its size
                    counter.textContent = target >= 100 ? 
                        Math.floor(current) : 
                        current.toFixed(1);
                    
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    };
    
    // Initialize counters when they come into view
    const observeCounters = () => {
        const counterSections = document.querySelectorAll('.hero, .stats');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        counterSections.forEach(section => {
            observer.observe(section);
        });
    };
    
    observeCounters();
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Close all other open FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = '0px';
                }
            });
            
            // Toggle current FAQ
            const isActive = item.classList.toggle('active');
            
            if (isActive) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0px';
            }
        });
    });
    
    // Apply initial max-height of 0 to all FAQ answers
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.style.maxHeight = '0px';
    });
    
    // Growth bar animation
    const animateGrowthBars = () => {
        const growthBars = document.querySelectorAll('.growth-bar');
        const maxValue = Math.max(...Array.from(growthBars).map(bar => 
            parseFloat(bar.getAttribute('data-value'))));
        
        growthBars.forEach(bar => {
            const value = parseFloat(bar.getAttribute('data-value'));
            const percentage = (value / maxValue) * 100;
            
            // Reset width to start the animation
            bar.style.width = '0%';
            
            // Use setTimeout to create a slight delay to ensure CSS transitions work
            setTimeout(() => {
                bar.style.transition = 'width 1.5s ease-out';
                bar.style.width = `${percentage}%`;
            }, 100);
        });
    };
    
    // Initialize growth bars when they come into view
    const observeGrowthBars = () => {
        const growthSection = document.querySelector('.visualizations');
        
        if (growthSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateGrowthBars();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(growthSection);
        }
    };
    
    observeGrowthBars();
    
    // Smooth scroll for navigation links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile navigation if open
                    if (navLinks && window.innerWidth < 768 && navLinks.style.display === 'flex') {
                        navLinks.style.display = 'none';
                    }
                }
            }
        });
    });
    
    // Add fade-in animations to elements
    const observeFadeElements = () => {
        const fadeElements = document.querySelectorAll('.section-title, .feature-card, .stats__card, .benefit-card, .testimonial-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    };
    
    observeFadeElements();
});

// Fix for mobile nav when resizing window
window.addEventListener('resize', function() {
    const navLinks = document.querySelector('.nav__links');
    
    if (window.innerWidth > 768 && navLinks.style.display === 'flex') {
        navLinks.style.display = '';
    }
});