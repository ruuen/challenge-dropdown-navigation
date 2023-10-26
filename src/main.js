const body = document.querySelector("body");
const navMenu = document.querySelector(".navbar__menu");
const firstNavLink = navMenu.querySelector(".navbar__link-group > .navbar__dropdown > .navbar__dropdown-toggle");

const btnOpenMenu = document.querySelector(`.navbar__btn[data-menu-action="open"]`);
const btnCloseMenu = document.querySelector(`.navbar__btn[data-menu-action="close"]`);
const dropdownBtns = document.querySelectorAll(".navbar__dropdown-toggle");

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
dropdownBtns.forEach(btn => btn.addEventListener("click", (e) => toggleDropdown(e.currentTarget.getAttribute("aria-controls"))));

function toggleMobileNav(action) {
    const displayClass = "navbar__menu--open";
    // TODO: Confirm if you should set expanded on both buttons that toggle the element
    if (action === "close") {
        // Remove classes to show elements
        body.classList.remove("prevent-scroll");
        navMenu.classList.remove(displayClass);
        // Update aria-expanded for nav menu buttons
        btnOpenMenu.ariaExpanded = "false";
        btnCloseMenu.ariaExpanded = "false";
        // Return focus to the open menu button (no indicator when clicked)
        btnOpenMenu.focus({ preventScroll: true, focusVisible: false })
        return;
    }

    // Add classes to show elements
    body.classList.add("prevent-scroll");
    navMenu.classList.add(displayClass);
    // Update aria-expanded for nav menu buttons
    btnOpenMenu.ariaExpanded = "true";
    btnCloseMenu.ariaExpanded = "true";
    // Focus the first nav link
    // "focusVisible: false" prevents visual indicator on focus when clicked for some browsers
    // Focus indicator still appears when using tab/SR to toggle menu and navigate
    firstNavLink.focus({ preventScroll: true, focusVisible: false })
}

function toggleDropdown(dropdownId) {
    const displayClass = "navbar__dropdown--open";
    const element = document.querySelector(`#${dropdownId}`).closest(".navbar__dropdown");

    if (element.classList.contains(displayClass)) {
        element.classList.remove(displayClass);
        return;
    }

    element.classList.add(displayClass);
}