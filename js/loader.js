
window.addEventListener('load', () => {
    document.querySelector('.home').style.visibility = 'visible'
    document.querySelector(".home").style.opacity = 1

    if (window.innerWidth > 1001) {
        document.querySelector('.navbar').style.visibility = 'visible'
        document.querySelector(".navbar").style.opacity = 1
    }
    else{
        document.querySelector('.navbar_').style.visibility = 'visible'
        document.querySelector(".navbar_").style.opacity = 1
    }
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 1001) {
        document.querySelector('.navbar').style.visibility = 'visible'
        document.querySelector(".navbar").style.opacity = 1

        document.querySelector('.navbar_').style.visibility = 'hidden'
        document.querySelector(".navbar_").style.opacity = 0
    }
    else{
        document.querySelector('.navbar_').style.visibility = 'visible'
        document.querySelector(".navbar_").style.opacity = 1

        document.querySelector('.navbar').style.visibility = 'hidden'
        document.querySelector(".navbar").style.opacity = 0
    }
});