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
