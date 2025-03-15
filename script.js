// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }

    // Simulate API call
    setTimeout(() => {
        showNotification('Thanks for joining the vibe revolution! 🚀', 'success');
        this.reset();
    }, 1000);
});

// Enhanced notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });

    const notification = document.createElement('div');
    const icon = type === 'error' ? '❌' : '✨';
    
    notification.className = `notification fixed bottom-8 right-8 px-6 py-4 rounded-xl text-white transform transition-all duration-500 translate-y-full flex items-center gap-3 backdrop-blur-sm ${
        type === 'error' 
            ? 'bg-gradient-to-r from-red-500/90 to-pink-500/90' 
            : 'bg-gradient-to-r from-indigo-500/90 to-purple-500/90'
    }`;
    
    notification.innerHTML = `
        <span class="text-xl">${icon}</span>
        <span class="font-medium">${message}</span>
    `;
    
    // Add enhanced shadow and border
    notification.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2), 0 0 15px rgba(99, 102, 241, 0.1)';
    notification.style.border = '1px solid rgba(255,255,255,0.15)';
    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateY(0)';
    });

    // Remove after 4 seconds with enhanced animation
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px) scale(0.95)';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
    });
}, observerOptions);

// Add animation classes to elements
document.querySelectorAll('section > div').forEach(el => {
    el.classList.add('transform', 'transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
    observer.observe(el);
});

// Particle animation in hero section
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'absolute w-2 h-2 bg-purple-500/20 rounded-full';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.animation = `float ${3 + Math.random() * 4}s linear infinite`;
    document.querySelector('.hero-particles').appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 7000);
}

// Create particles periodically
setInterval(createParticle, 1000);
