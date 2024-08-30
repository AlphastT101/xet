// Detect if DevTools is open by measuring the window size
const threshold = 160; // Adjust as needed for different screen sizes
const checkDevTools = () => {
    if (window.outerWidth - window.innerWidth > threshold || 
        window.outerHeight - window.innerHeight > threshold) {
        alert('Developer tools detected! Please close them.');
    }
};

// Check for DevTools on load and resize
window.addEventListener('load', checkDevTools);
window.addEventListener('resize', checkDevTools);

// Disable right-click context menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    // alert('Right-click is disabled on this site.');
});

// Disable F12 key and Ctrl+Shift+I/Ctrl+U
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || 
        (e.ctrlKey && (e.shiftKey && e.key === 'I') || e.key === 'U')) {
        e.preventDefault();
        // alert('Keyboard shortcuts are disabled on this site.');
    }
});