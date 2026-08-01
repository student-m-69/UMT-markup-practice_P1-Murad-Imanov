(() => {
  const productModal = document.querySelector("#product-modal");
  const orderModal = document.querySelector("#order-modal");
  const productCards = document.querySelectorAll(
    ".bestsellers-item, .bouquets-item",
  );

  const openModal = (modal) => {
    modal.classList.add("is-open");
    document.body.classList.add("is-scroll-locked");
  };

  const closeModal = (modal) => {
    modal.classList.remove("is-open");
    document.body.classList.remove("is-scroll-locked");
  };

  productCards.forEach((card) =>
    card.addEventListener("click", () => openModal(productModal)),
  );

  [productModal, orderModal].forEach((modal) => {
    modal
      .querySelector(".modal-close-button")
      .addEventListener("click", () => closeModal(modal));

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      [productModal, orderModal].forEach(closeModal);
    }
  });

  document
    .querySelector(".product-modal-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      closeModal(productModal);
      openModal(orderModal);
    });

  document.querySelector(".order-form").addEventListener("submit", (event) => {
    event.preventDefault();
    event.target.reset();
    closeModal(orderModal);
  });
})();
