const breakpointDesktop = getPixelsFromRem(56.25);
const displayClassMenu = "navbar__menu--open";
const displayClassDropdown = "navbar__dropdown--open";
const classDropdown = "navbar__dropdown";
const classDropdownToggle = "navbar__dropdown-toggle";
const classPreventBodyScroll = "prevent-scroll";

const body = document.querySelector("body");
const navMenu = document.querySelector(".navbar__menu");
const firstNavLink = navMenu.querySelector(".navbar__link-group > .navbar__dropdown > .navbar__dropdown-toggle");

const btnOpenMenu = document.querySelector(`.navbar__btn[data-menu-action="open"]`);
const btnCloseMenu = document.querySelector(`.navbar__btn[data-menu-action="close"]`);
const dropdownBtns = document.querySelectorAll(`.${classDropdownToggle}`);
const dropdownMenus = document.querySelectorAll(`.${classDropdown}`);

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
window.addEventListener("resize", clearMobileNavBehaviour);

function toggleMobileNav(action) {
    if (action === "close") {
        // Remove classes to show elements
        body.classList.remove(classPreventBodyScroll);
        navMenu.classList.remove(displayClassMenu);
        // Update aria-expanded for nav menu buttons
        btnOpenMenu.ariaExpanded = "false";
        btnCloseMenu.ariaExpanded = "false";
        // Return focus to the open menu button (no indicator when clicked)
        btnOpenMenu.focus({ preventScroll: true, focusVisible: false })
        return;
    }

    // Add classes to show elements
    body.classList.add(classPreventBodyScroll);
    navMenu.classList.add(displayClassMenu);
    // Update aria-expanded for nav menu buttons
    btnOpenMenu.ariaExpanded = "true";
    btnCloseMenu.ariaExpanded = "true";
    // Focus the first nav link
    // "focusVisible: false" prevents visual indicator on focus when clicked for some browsers
    // Focus indicator still appears when using tab/SR to toggle menu and navigate
    firstNavLink.focus({ preventScroll: true, focusVisible: false })
}

function toggleDropdown(dropdownId) {
    const element = document.querySelector(`#${dropdownId}`).closest(`.${classDropdown}`);
    const toggleButton = element.querySelector(`.${classDropdownToggle}`);

    if (element.classList.contains(displayClassDropdown)) {
        element.classList.remove(displayClassDropdown);
        toggleButton.ariaExpanded = "false";
        return;
    }

    element.classList.add(displayClassDropdown);
    toggleButton.ariaExpanded = "true";
}

// Run when window resizes
// If window > desktop min-width breakpoint, remove open state classes for navbar menu and all dropdowns
// Navbar is not needed and dropdowns get controlled via CSS on desktop
function clearMobileNavBehaviour() {
    const viewport = window.innerWidth;
    if (viewport > breakpointDesktop) {
        navMenu.classList.remove(displayClassMenu);
        btnOpenMenu.ariaExpanded = "false";
        btnCloseMenu.ariaExpanded = "false";
        dropdownBtns.forEach(btn => {
            const parent = btn.closest(`.${classDropdown}`);
            parent.classList.remove(displayClassDropdown);
            btn.ariaExpanded = "false";
        })
    }
}

// Convert rem to pixels based on root font size value
function getPixelsFromRem(remInt) {
    return remInt * parseFloat(getComputedStyle(document.documentElement).fontSize);
}