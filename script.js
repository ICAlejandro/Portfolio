const toggleButton = document.getElementById('theme-toggle');
const sideImg = document.getElementById('side-img');
const sidebar = document.querySelector('.side-bar');
const footer = document.getElementById('portfolio-footer');
const welcomeOverlay = document.getElementById('welcome-overlay');
const enterBtn = document.getElementById('enter-btn');
const userNameInput = document.getElementById('user-name');

const SIDE_IMG_SPEED = 0.0005;
const SIDEBAR_GAP = 20;
const compactLayout = window.matchMedia('(min-width: 769px) and (max-width: 1100px)');

let frameQueued = false;
let sidebarHeight = 0;
let footerTop = 0;
let isPinned = false;
let lastPinnedTop = null;

function measure() {
    if (sidebar) sidebarHeight = sidebar.offsetHeight;
    if (footer) footerTop = footer.offsetTop;
}

function updateSideImage() {
    if (!sideImg) return;
    sideImg.style.setProperty('--parallax', `${window.scrollY * SIDE_IMG_SPEED}vh`);
}

function setPinned(value) {
    isPinned = value;
    sidebar.classList.toggle('pinned', value);
    if (!value) {
        sidebar.style.removeProperty('top');
        lastPinnedTop = null;
    }
}

function updateSidebar() {
    if (!sidebar || !footer) return;

    if (compactLayout.matches) {
        if (isPinned) setPinned(false);
        return;
    }

    const distance = footerTop - window.scrollY;
    const shouldPin = distance <= sidebarHeight + window.innerHeight * 0.05;

    if (shouldPin !== isPinned) setPinned(shouldPin);

    if (shouldPin) {
        const top = footerTop - sidebarHeight - SIDEBAR_GAP;
        if (top !== lastPinnedTop) {
            sidebar.style.top = `${top}px`;
            lastPinnedTop = top;
        }
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

function onLayoutChange() {
    lastPinnedTop = null;
    measure();
    onViewportChange();
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
window.addEventListener('resize', onLayoutChange);
window.addEventListener('load', onLayoutChange);

if ('ResizeObserver' in window) {
    new ResizeObserver(onLayoutChange).observe(document.body);
}
