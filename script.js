const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark');
});

// Adjust this factor to control speed (less than 1 = slower, more than 1 = faster) also fully ai generated
const speedFactor = 0.0009;
const sideImg = document.getElementById('side-img');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    sideImg.style.top = `${80 + scrollY * speedFactor}vh`; // use vh for relative positioning
});

// fully ai
function adjustMiddleStrip() {
    const strip = document.querySelector('.middle-strip');
    const bodyHeight = document.body.scrollHeight; // full document height
    strip.style.height = bodyHeight + 'px';
}

// adjust on load
window.addEventListener('load', adjustMiddleStrip);

// adjust on resize (optional, in case content changes)
window.addEventListener('resize', adjustMiddleStrip);
