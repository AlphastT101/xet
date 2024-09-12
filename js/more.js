document.querySelector('.more-button_').addEventListener('click', () => {
    const navlinks = document.querySelector('.navlinks_');
    navlinks.classList.toggle('show');
});

document.querySelectorAll('.navbar-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.navlinks_').classList.remove('show');
        document.body.style.overflow = 'auto'; // Enable scrolling when the menu is hidden
    });
});
