const toggleButton = document.getElementById('theme-toggle');
const sideImg = document.getElementById('side-img');
const sidebar = document.querySelector('.side-bar');
const footer = document.getElementById('portfolio-footer');
const welcomeOverlay = document.getElementById('welcome-overlay');
const enterBtn = document.getElementById('enter-btn');
const userNameInput = document.getElementById('user-name');

const SIDE_IMG_SPEED = 0.0009;
const SIDE_IMG_START_VH = 80;
const SIDEBAR_GAP = 20;
const compactLayout = window.matchMedia('(min-width: 769px) and (max-width: 1100px)');

let frameQueued = false;

function updateSideImage() {
    if (!sideImg) return;
    sideImg.style.top = `${SIDE_IMG_START_VH + window.scrollY * SIDE_IMG_SPEED}vh`;
}

function updateSidebar() {
    if (!sidebar || !footer || compactLayout.matches) {
        if (sidebar) {
            sidebar.classList.remove('pinned');
            sidebar.style.removeProperty('top');
        }
        return;
    }

    const sidebarHeight = sidebar.offsetHeight;
    const footerTop = footer.getBoundingClientRect().top;
    const shouldPin = footerTop <= sidebarHeight + window.innerHeight * 0.05;

    sidebar.classList.toggle('pinned', shouldPin);

    if (shouldPin) {
        sidebar.style.top = `${footer.offsetTop - sidebarHeight - SIDEBAR_GAP}px`;
    } else {
        sidebar.style.removeProperty('top');
    }
}

function onViewportChange() {
    if (frameQueued) return;
    frameQueued = true;
    requestAnimationFrame(() => {
        updateSideImage();
        updateSidebar();
        frameQueued = false;
    });
}

if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark');
    });
}

if (welcomeOverlay && enterBtn && userNameInput) {
    enterBtn.addEventListener('click', () => {
        const name = userNameInput.value.trim() || 'Guest';
        alert(`Welcome, ${name}!`);
        welcomeOverlay.style.display = 'none';
    });
}

window.addEventListener('scroll', onViewportChange, { passive: true });
window.addEventListener('resize', onViewportChange);
window.addEventListener('load', onViewportChange);
