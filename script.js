// ============================================
// WADDOLANKA - Simple JavaScript
// ============================================

// Data
const services = [
    { id: 'garage', name: 'Vehicle Garage', icon: 'fa-car', desc: 'Find trusted mechanics and auto repair shops.' },
    { id: 'electrician', name: 'Electrician', icon: 'fa-bolt', desc: 'Professional electrical services for your home.' },
    { id: 'carpenter', name: 'Carpenter', icon: 'fa-hammer', desc: 'Skilled woodworkers for furniture and repairs.' },
    { id: 'plumber', name: 'Plumber', icon: 'fa-faucet', desc: 'Expert plumbing solutions for all your needs.' },
    { id: 'teacher', name: 'Teacher', icon: 'fa-chalkboard-teacher', desc: 'Qualified tutors and educators for all subjects.' },
    { id: 'catering', name: 'Food & Catering', icon: 'fa-utensils', desc: 'Delicious food services for events and daily meals.' },
    { id: 'doctor', name: 'Doctor Service', icon: 'fa-user-md', desc: 'Medical professionals for home visits and clinics.' },
    { id: 'farmer', name: 'Farmers', icon: 'fa-tractor', desc: 'Fresh produce and agricultural services.' },
    { id: 'dayworker', name: 'Day Workers', icon: 'fa-people-carry', desc: 'Reliable workers for daily labor needs.' },
    { id: 'tire', name: 'Tire Service', icon: 'fa-circle', desc: 'Tire repair, replacement, and maintenance.' }
];

const districts = [
    { id: 'colombo', name: 'Colombo', count: 523 },
    { id: 'gampaha', name: 'Gampaha', count: 412 },
    { id: 'kalutara', name: 'Kalutara', count: 287 },
    { id: 'kandy', name: 'Kandy', count: 356 },
    { id: 'galle', name: 'Galle', count: 198 },
    { id: 'matara', name: 'Matara', count: 167 },
    { id: 'kurunegala', name: 'Kurunegala', count: 234 },
    { id: 'anuradhapura', name: 'Anuradhapura', count: 189 },
    { id: 'jaffna', name: 'Jaffna', count: 156 },
    { id: 'batticaloa', name: 'Batticaloa', count: 134 },
    { id: 'trincomalee', name: 'Trincomalee', count: 112 },
    { id: 'ratnapura', name: 'Ratnapura', count: 178 },
    { id: 'badulla', name: 'Badulla', count: 145 },
    { id: 'nuwara-eliya', name: 'Nuwara Eliya', count: 123 },
    { id: 'hambantota', name: 'Hambantota', count: 98 }
];

const providers = [
    { name: 'Sunil Auto Works', category: 'garage', district: 'colombo', phone: '+94 77 234 5678', rating: 4.8, desc: 'Expert vehicle repair and maintenance services.' },
    { name: 'Lakmal Electrical', category: 'electrician', district: 'gampaha', phone: '+94 76 345 6789', rating: 4.7, desc: 'Residential and commercial electrical solutions.' },
    { name: 'Nimal Carpentry', category: 'carpenter', district: 'kandy', phone: '+94 71 456 7890', rating: 4.9, desc: 'Custom furniture and woodwork specialists.' },
    { name: 'Priya Plumbing', category: 'plumber', district: 'galle', phone: '+94 91 234 5678', rating: 4.6, desc: '24/7 emergency plumbing services available.' },
    { name: 'Saman Tuition', category: 'teacher', district: 'colombo', phone: '+94 77 567 8901', rating: 4.8, desc: 'O/L and A/L classes for all subjects.' },
    { name: 'Kumari Catering', category: 'catering', district: 'matara', phone: '+94 41 345 6789', rating: 4.7, desc: 'Wedding and event catering services.' },
    { name: 'Dr. Perera Clinic', category: 'doctor', district: 'kurunegala', phone: '+94 37 456 7890', rating: 4.9, desc: 'General practitioner with home visits.' },
    { name: 'Rohan Farms', category: 'farmer', district: 'anuradhapura', phone: '+94 25 567 8901', rating: 4.5, desc: 'Organic vegetables and fresh produce.' },
    { name: 'Day Labor Team', category: 'dayworker', district: 'jaffna', phone: '+94 21 678 9012', rating: 4.6, desc: 'Reliable workers for construction and moving.' },
    { name: 'Tire King', category: 'tire', district: 'ratnapura', phone: '+94 45 789 0123', rating: 4.8, desc: 'Tire repair, replacement, and balancing.' }
];

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    renderServices();
    renderProviders();
    renderDistricts();
    initMobileMenu();
    initStickyHeader();
    initBackToTop();
    initSmoothScroll();
    initCounters();
    initContactForm();
});

// Render Services
function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;

    grid.innerHTML = services.map(s => `
        <div class="service-card" onclick="filterByService('${s.id}')">
            <div class="service-icon"><i class="fas ${s.icon}"></i></div>
            <h3>${s.name}</h3>
            <p>${s.desc}</p>
        </div>
    `).join('');
}

// Render Providers
function renderProviders(filtered = providers) {
    const grid = document.getElementById('providersGrid');
    if (!grid) return;

    if (filtered.length === 0) {
        grid.innerHTML = '<div style="text-align:center;grid-column:1/-1;padding:2rem;color:#666;"><i class="fas fa-search" style="font-size:3rem;margin-bottom:1rem;color:#ddd;"></i><h3>No providers found</h3><p>Try different search criteria.</p></div>';
        return;
    }

    grid.innerHTML = filtered.map(p => {
        const service = services.find(s => s.id === p.category);
        const district = districts.find(d => d.id === p.district);
        const stars = '★'.repeat(Math.floor(p.rating)) + '☆'.repeat(5 - Math.floor(p.rating));
        return `
            <div class="provider-card">
                <div class="provider-header">
                    <div class="provider-avatar">${p.name.split(' ').map(n => n[0]).join('').substring(0,2)}</div>
                    <div class="provider-info">
                        <h3>${p.name}</h3>
                        <span class="category"><i class="fas ${service?.icon || 'fa-tools'}"></i> ${service?.name || p.category}</span>
                        <div class="district"><i class="fas fa-map-marker-alt"></i> ${district?.name || p.district}</div>
                        <div style="color:#FFC107;font-size:0.9rem;">${stars} ${p.rating}</div>
                    </div>
                </div>
                <div class="provider-body">
                    <p>${p.desc}</p>
                </div>
                <div class="provider-footer">
                    <a href="tel:${p.phone}" class="btn btn-call"><i class="fas fa-phone"></i> Call</a>
                    <a href="https://wa.me/${p.phone.replace(/\D/g,'')}" target="_blank" class="btn btn-whatsapp"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                </div>
            </div>
        `;
    }).join('');
}

// Render Districts
function renderDistricts() {
    const grid = document.getElementById('districtsGrid');
    if (!grid) return;

    grid.innerHTML = districts.map(d => `
        <div class="district-card" onclick="filterByDistrict('${d.id}')">
            <i class="fas fa-map-marker-alt"></i>
            <span>${d.name}</span>
            <span class="district-count">${d.count} providers</span>
        </div>
    `).join('');
}

// Search Function
function searchProviders() {
    const service = document.getElementById('serviceSelect').value;
    const district = document.getElementById('districtSelect').value;

    let filtered = providers;
    if (service) filtered = filtered.filter(p => p.category === service);
    if (district) filtered = filtered.filter(p => p.district === district);

    renderProviders(filtered);
    document.getElementById('providers').scrollIntoView({ behavior: 'smooth' });
}

function filterByService(serviceId) {
    document.getElementById('serviceSelect').value = serviceId;
    searchProviders();
}

function filterByDistrict(districtId) {
    document.getElementById('districtSelect').value = districtId;
    searchProviders();
}

// Mobile Menu
function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = toggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const icon = toggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
}

// Sticky Header
function initStickyHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    });
}

// Back to Top
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Active Nav Link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
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

// Counters Animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-num');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 30);
}

// Contact Form
/*function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        showToast('Message sent successfully! We will contact you soon.');
        form.reset();
    });
}*/

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        emailjs.send(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            }
        )
        .then(function() {
            alert('Message sent successfully!');
            form.reset();
        })
        .catch(function(error) {
            console.error('EmailJS Error:', error);
            alert('Failed to send message.');
        });
    });
}



// Toast Notification
function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}
