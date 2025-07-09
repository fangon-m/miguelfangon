// Smooth scrolling for navigation
const navIcons = document.querySelectorAll('.nav-icon');
let isScrollingByClick = false;

navIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        isScrollingByClick = true;
        navIcons.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        const section = this.getAttribute('data-section');
        if (section) {
            document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
        }
        // Remove the flag after scrolling finishes (adjust timeout as needed)
        setTimeout(() => { isScrollingByClick = false; }, 800);
    });
});

// Highlight nav-icon based on scroll position (SINGLE SCROLL LISTENER)
window.addEventListener('scroll', () => {
    if (isScrollingByClick) return;

    const sections = ['hero', 'projects', 'skills', 'contact'];
    let current = sections[0];

    // Check if we're near the bottom of the page
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 50)) {
        current = 'contact';
    } else {
        for (let i = 0; i < sections.length; i++) {
            const section = document.getElementById(sections[i]);
            if (section) {
                const rect = section.getBoundingClientRect();
                const trigger = window.innerHeight / 2;
                if (rect.top <= trigger && rect.bottom >= trigger) {
                    current = sections[i];
                }
            }
        }
    }

    navIcons.forEach(icon => {
        icon.classList.toggle('active', icon.getAttribute('data-section') === current);
    });
});

// Smooth scrolling for buttons
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Improved Project filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');
        const portfolioGrid = document.querySelector('.portfolio-grid');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        // Use requestAnimationFrame for smoother performance
        requestAnimationFrame(() => {
            portfolioItems.forEach(item => {
                const parentLink = item.closest('a');
                if (filter === 'all') {
                    // Show all items
                    parentLink.style.opacity = '1';
                    parentLink.style.transform = 'scale(1)';
                    parentLink.style.visibility = 'visible';
                    parentLink.style.position = 'relative';
                } else if (item.classList.contains(filter)) {
                    // Show matching items
                    parentLink.style.opacity = '1';
                    parentLink.style.transform = 'scale(1)';
                    parentLink.style.visibility = 'visible';
                    parentLink.style.position = 'relative';
                } else {
                    // Hide non-matching items but keep them in layout
                    parentLink.style.opacity = '0';
                    parentLink.style.transform = 'scale(0.8)';
                    parentLink.style.visibility = 'hidden';
                    parentLink.style.position = 'absolute';
                }
            });
        });
    });
});