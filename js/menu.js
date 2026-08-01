(() => {
  const menu = document.querySelector(".mobile-menu");
  const openButton = document.querySelector(".burger-button");
  const closeButton = document.querySelector(".menu-close-button");
  const menuLinks = document.querySelectorAll(
    ".mobile-menu-link, .mobile-menu-button",
  );

  const toggleMenu = () => {
    const isOpen = menu.classList.toggle("is-open");
    document.body.classList.toggle("is-scroll-locked", isOpen);
    openButton.setAttribute("aria-expanded", String(isOpen));
  };

  openButton.addEventListener("click", toggleMenu);
  closeButton.addEventListener("click", toggleMenu);
  menuLinks.forEach((link) => link.addEventListener("click", toggleMenu));
})();
