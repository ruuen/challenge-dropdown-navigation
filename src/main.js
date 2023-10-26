const body = document.querySelector("body");
const navMenu = document.querySelector(".navbar__menu");
const firstNavLink = navMenu.querySelector(".navbar__link-group > *");

const btnOpenMenu = document.querySelector(`.navbar__btn[data-menu-action="open"]`);
const btnCloseMenu = document.querySelector(`.navbar__btn[data-menu-action="close"]`);

btnOpenMenu.addEventListener("click", () => toggleMobileNav(btnOpenMenu.dataset.menuAction));
btnCloseMenu.addEventListener("click", () => toggleMobileNav(btnCloseMenu.dataset.menuAction));
navMenu.addEventListener("click", (e) => {
    if (e.target.id === "site-nav-menu") {
        toggleMobileNav("close");
    }
})
navMenu.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        toggleMobileNav("close");
    }
})

function toggleMobileNav(action) {
    // TODO: Confirm if you should set expanded on both buttons that toggle the element
    if (action === "close") {
        body.classList.remove("prevent-scroll");
        navMenu.classList.remove("navbar__menu--open");
        btnCloseMenu.ariaExpanded = "false";
        btnOpenMenu.focus({ preventScroll: true })
        return;
    }

    body.classList.add("prevent-scroll");
    navMenu.classList.add("navbar__menu--open");
    btnOpenMenu.ariaExpanded = "true";
    firstNavLink.focus({ preventScroll: true })
}