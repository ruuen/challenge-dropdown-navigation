const body = document.querySelector("body");
const navMenu = document.querySelector(".navbar__menu");
const firstNavLink = navMenu.querySelector(".navbar__link-group > *");

const btnOpenMenu = document.querySelector(`.navbar__btn[data-menu-action="open"]`);
const btnCloseMenu = document.querySelector(`.navbar__btn[data-menu-action="close"]`);

btnOpenMenu.addEventListener("click", () => toggleMobileNav(btnOpenMenu.dataset.menuAction));
btnCloseMenu.addEventListener("click", () => toggleMobileNav(btnCloseMenu.dataset.menuAction));

function toggleMobileNav(buttonAction) {
    // TODO: Confirm if you should set expanded on both buttons that toggle the element
    if (buttonAction === "close") {
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