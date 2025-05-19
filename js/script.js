document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
    
    // Projects Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            // For now, we'll just log it and show an alert
            console.log({ name, email, subject, message });
            
            const feedbackElement = document.getElementById('formFeedback');
            feedbackElement.textContent = 'Thank you for your message! We will get back to you soon.';
            feedbackElement.style.color = '#4CAF50';
            contactForm.reset();
            
            // Clear feedback after 5 seconds
            setTimeout(() => {
                feedbackElement.textContent = '';
            }, 5000);
        });
    }
    
    // Google Form Submission
    const googleForm = document.getElementById('googleForm');
    if (googleForm) {
        googleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const form = e.target;
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Prepare Google Forms URL with parameters
            const googleFormUrl = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';
            const queryParams = new URLSearchParams({
                'entry.941167811': name,
                'entry.2043172092': email,
                'entry.828690587': subject,
                'entry.1050254553': message,
                'submit': 'Submit'
            });
            
            // Submit to Google Forms using fetch
            fetch(`${googleFormUrl}?${queryParams.toString()}`, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(() => {
                // Show success message
                const feedbackElement = document.getElementById('formFeedback');
                feedbackElement.textContent = 'Thank you! Your message has been sent.';
                feedbackElement.style.color = '#4CAF50';
                form.reset();
                
                // Clear feedback after 5 seconds
                setTimeout(() => {
                    feedbackElement.textContent = '';
                }, 5000);
            })
            .catch(() => {
                // Show error message
                const feedbackElement = document.getElementById('formFeedback');
                feedbackElement.textContent = 'Error sending message. Please try again.';
                feedbackElement.style.color = '#F44336';
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.project-card, .team-member, .value-card, .testimonial-card, .link-card');
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight / 1.2;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < triggerPoint) {
                element.classList.add('visible');
            }
        });
    };
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Set initial state for animated elements
    document.querySelectorAll('.project-card, .team-member, .value-card, .testimonial-card, .link-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Logo hover effect
    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        logoContainer.addEventListener('mouseenter', () => {
            const logoTilt = document.querySelector('.logo-tilt');
            logoTilt.style.transform = 'rotate(5deg)';
        });
        
        logoContainer.addEventListener('mouseleave', () => {
            const logoTilt = document.querySelector('.logo-tilt');
            logoTilt.style.transform = 'rotate(-5deg)';
        });
    }
    
    // Handle resize events
    window.addEventListener('resize', function() {
        // Close mobile menu if screen size increases
        if (window.innerWidth > 768) {
            const nav = document.querySelector('nav ul');
            const menuToggle = document.querySelector('.menu-toggle');
            if (nav && menuToggle) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
});
