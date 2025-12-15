const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark');
});

// Adjust this factor to control speed (less than 1 = slower, more than 1 = faster) also (AI assisted)
const speedFactor = 0.0009;
const sideImg = document.getElementById('side-img');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    sideImg.style.top = `${80 + scrollY * speedFactor}vh`; // use vh for relative positioning
});

// ai assisted
function adjustMiddleStrip() {
    const strip = document.querySelector('.middle-strip');
    const bodyHeight = document.body.scrollHeight; // full document height
    strip.style.height = bodyHeight + 'px';
}

// formatting
window.addEventListener('load', adjustMiddleStrip);
window.addEventListener('resize', adjustMiddleStrip);

// fa3 task thiing
const welcomeOverlay = document.getElementById('welcome-overlay');
const enterBtn = document.getElementById('enter-btn');
const userNameInput = document.getElementById('user-name');

enterBtn.addEventListener('click', () => {
    const name = userNameInput.value.trim() || "Guest"; 
    alert(`Welcome, ${name}!`); 
    welcomeOverlay.style.display = 'none';
});
