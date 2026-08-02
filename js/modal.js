(() => {
  const productModal = document.querySelector("#product-modal");
  const orderModal = document.querySelector("#order-modal");
  const modalImage = productModal.querySelector(".product-modal-image");
  const modalTitle = productModal.querySelector(".product-modal-title");
  const modalPrice = productModal.querySelector(".product-modal-price");
  const modalText = productModal.querySelector(".product-modal-text");

  const openModal = (modal) => {
    modal.classList.add("is-open");
    document.body.classList.add("is-scroll-locked");
  };

  const closeModal = (modal) => {
    modal.classList.remove("is-open");
    document.body.classList.remove("is-scroll-locked");
  };

  const handleCardClick = (event) => {
    const card = event.target.closest(".bestsellers-item, .bouquets-item");
    if (!card) {
      return;
    }
    const { name, price, description, image, image2x, alt } = card.dataset;
    modalTitle.textContent = name;
    modalPrice.textContent = `$${price}`;
    modalText.textContent = description;
    modalImage.src = image;
    if (image2x) {
      modalImage.srcset = `${image} 1x, ${image2x} 2x`;
    } else {
      modalImage.removeAttribute("srcset");
    }
    modalImage.alt = alt;
    openModal(productModal);
  };

  document
    .querySelectorAll(".bestsellers-list, .bouquets-list")
    .forEach((list) => list.addEventListener("click", handleCardClick));

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
