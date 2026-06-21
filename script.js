const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark');
    });
}

// Adjust this factor to control speed (less than 1 = slower, more than 1 = faster)
const speedFactor = 0.0009;
const sideImg = document.getElementById('side-img');

window.addEventListener('scroll', () => {
    if (sideImg) {
        const scrollY = window.scrollY;
        sideImg.style.top = `${80 + scrollY * speedFactor}vh`; // use vh for relative positioning
    }
});

function adjustMiddleStrip() {
    const strip = document.querySelector('.middle-strip');
    if (strip) {
        const bodyHeight = document.body.scrollHeight; // full document height
        strip.style.height = bodyHeight + 'px';
    }
}

// formatting
window.addEventListener('load', adjustMiddleStrip);
window.addEventListener('resize', adjustMiddleStrip);

// Safe overlay input validation logic
const welcomeOverlay = document.getElementById('welcome-overlay');
const enterBtn = document.getElementById('enter-btn');
const userNameInput = document.getElementById('user-name');

if (welcomeOverlay && enterBtn && userNameInput) {
    enterBtn.addEventListener('click', () => {
        const name = userNameInput.value.trim() || "Guest"; 
        alert(`Welcome, ${name}!`); 
        welcomeOverlay.style.display = 'none';
    });
}

// New: Stop Sidebar from covering the Footer while keeping alignment intact
const sidebar = document.querySelector('.side-bar');
const footer = document.getElementById('portfolio-footer');

function pinSidebarAtFooter() {
    if (!sidebar || !footer || window.innerWidth <= 768) {
        if (sidebar) sidebar.removeAttribute('style'); // reset style on mobile view
        return;
    }

    const sidebarRect = sidebar.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    
    // Check if the bottom edge of the sidebar touches the top edge of the footer
    if (footerRect.top <= sidebarRect.height + (window.innerHeight * 0.05)) {
        // Calculate the absolute top spot relative to the page document
        const footerTopOffset = footer.offsetTop;
        sidebar.style.position = 'absolute';
        sidebar.style.top = `${footerTopOffset - sidebarRect.height - 20}px`;
    } else {
        // Safe standard fixed state behavior
        sidebar.style.position = 'fixed';
        sidebar.style.top = '5%';
    }
}

window.addEventListener('scroll', pinSidebarAtFooter);
window.addEventListener('resize', pinSidebarAtFooter);
window.addEventListener('load', pinSidebarAtFooter);