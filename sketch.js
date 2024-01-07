let menu = document.querySelector('.menu-icon');
let sideMenu = document.querySelector(".side-menu");

menu.onclick = () => {
    menu.classList.toggle('move');
    sideMenu.classList.toggle("open-menu");
}
window.onscroll = () => {
    menu.classList.remove('move');
    sideMenu.classList.remove("open-menu");
}

// Header Background change on scroll
let header = document.querySelector("header");

window.addEventListener('scroll', () => {
    header.classList.toggle("header-active", window.scrollY > 0)
})