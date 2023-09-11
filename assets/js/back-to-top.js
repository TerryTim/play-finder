// Back to Top Button
const backToTopBtn = document.getElementById('backToTopBtn');

backToTopBtn.addEventListener('click', () => {
    // Scroll to the top of the page smoothly
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show or hide the button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});