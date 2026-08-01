(() => {
  const API_URL =
    location.hostname === "localhost" || location.hostname === "127.0.0.1"
      ? "http://localhost:3000"
      : "https://my-json-server.typicode.com/student-m-69/UMT-markup-practice_P1-Murad-Imanov";

  const state = {
    page: 1,
    limit: 8,
    category: "",
  };

  const bouquetsList = document.querySelector(".bouquets-list");
  const bouquetsMessage = document.querySelector(".bouquets-message");
  const showMoreButton = document.querySelector(".bouquets-button");
  const filterButtons = document.querySelectorAll(".filter-button");
  const bestsellersList = document.querySelector(".bestsellers-list");
  const reviewsList = document.querySelector(".testimonials-list");
  const subscribeForm = document.querySelector(".subscribe-form");

  const productCard = (item, itemClass, imageClass, size) => `
    <li class="${itemClass}"
      data-name="${item.name}"
      data-price="${item.price}"
      data-description="${item.description}"
      data-image="${item.image}"
      data-image2x="${item.image2x}"
      data-alt="${item.alt}">
      <img
        class="${imageClass}"
        src="${item.image}"
        srcset="${item.image} 1x, ${item.image2x} 2x"
        alt="${item.alt}"
        width="${size.width}"
        height="${size.height}"
        loading="lazy"
      />
      <h3 class="card-name">${item.name}</h3>
      <p class="card-price">$${item.price}</p>
    </li>`;

  const bouquetCard = (item) =>
    productCard(item, "bouquets-item", "card-image bouquets-image", {
      width: 296,
      height: 296,
    });

  const bestsellerCard = (item) =>
    productCard(item, "bestsellers-item", "card-image", {
      width: 405,
      height: 320,
    });

  const reviewCard = (review) => `
    <li class="testimonials-item">
      <div class="testimonials-content">
        ${
          review.rating === 5
            ? `<svg class="testimonials-stars" width="116" height="19" role="img" aria-label="Rated 5 out of 5 stars">
                <use href="images/icons.svg#icon-stars"></use>
              </svg>`
            : ""
        }
        <p class="testimonials-quote">${review.text}</p>
      </div>
      <p class="testimonials-author">${review.author}</p>
    </li>`;

  const showMessage = (text) => {
    bouquetsMessage.textContent = text;
    bouquetsMessage.classList.remove("is-hidden");
  };

  const loadBouquets = async ({ reset = false } = {}) => {
    showMoreButton.classList.add("is-hidden");
    showMessage("Loading bouquets...");
    try {
      const params = { _page: state.page, _limit: state.limit };
      if (state.category) {
        params.category = state.category;
      }
      const { data } = await axios.get(`${API_URL}/bouquets`, { params });

      bouquetsMessage.classList.add("is-hidden");
      if (reset) {
        bouquetsList.innerHTML = "";
      }

      if (data.length === 0 && state.page === 1) {
        showMessage("No bouquets found for this filter.");
        return;
      }

      bouquetsList.insertAdjacentHTML(
        "beforeend",
        data.map(bouquetCard).join(""),
      );

      const endReached = data.length < state.limit;
      if (!endReached) {
        showMoreButton.classList.remove("is-hidden");
      } else if (state.page > 1) {
        showMessage("That's all the bouquets for now.");
      }
    } catch (error) {
      showMessage(
        "Something went wrong while loading bouquets. Please try again later.",
      );
    }
  };

  const loadBestsellers = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/bestsellers`);
      bestsellersList.innerHTML = "";
      bestsellersList.insertAdjacentHTML(
        "beforeend",
        data.map(bestsellerCard).join(""),
      );
      setupSlider(".bestsellers");
    } catch (error) {
      bestsellersList.insertAdjacentHTML(
        "beforeend",
        '<li class="bestsellers-item">Failed to load bestsellers. Please try again later.</li>',
      );
    }
  };

  const loadReviews = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/reviews`);
      reviewsList.innerHTML = "";
      reviewsList.insertAdjacentHTML(
        "beforeend",
        data.map(reviewCard).join(""),
      );
      setupSlider(".testimonials");
    } catch (error) {
      reviewsList.insertAdjacentHTML(
        "beforeend",
        '<li class="testimonials-item">Failed to load reviews. Please try again later.</li>',
      );
    }
  };

  filterButtons.forEach((button) =>
    button.addEventListener("click", () => {
      if (button.dataset.category === state.category) {
        return;
      }
      filterButtons.forEach((item) =>
        item.classList.toggle("filter-button-current", item === button),
      );
      state.category = button.dataset.category;
      state.page = 1;
      loadBouquets({ reset: true });
    }),
  );

  showMoreButton.addEventListener("click", () => {
    state.page += 1;
    loadBouquets();
  });

  subscribeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    event.target.reset();
  });

  loadBestsellers();
  loadReviews();
  loadBouquets({ reset: true });
})();
