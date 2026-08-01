const setupSlider = (sectionSelector) => {
  const section = document.querySelector(sectionSelector);
  const list = section.querySelector(".bestsellers-list, .testimonials-list");
  const [prevButton, nextButton] = section.querySelectorAll(".slider-button");
  const dots = section.querySelectorAll(".slider-dot");

  const stepWidth = () => {
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    return list.firstElementChild.getBoundingClientRect().width + gap;
  };

  const currentIndex = () => Math.round(list.scrollLeft / stepWidth());

  const update = () => {
    const maxScroll = list.scrollWidth - list.clientWidth;
    prevButton.disabled = list.scrollLeft <= 1;
    nextButton.disabled = list.scrollLeft >= maxScroll - 1;
    dots.forEach((dot, index) =>
      dot.classList.toggle("slider-dot-current", index === currentIndex()),
    );
  };

  const scrollToIndex = (index) => list.scrollTo({ left: index * stepWidth() });

  prevButton.addEventListener("click", () => scrollToIndex(currentIndex() - 1));
  nextButton.addEventListener("click", () => scrollToIndex(currentIndex() + 1));
  dots.forEach((dot, index) =>
    dot.addEventListener("click", () => scrollToIndex(index)),
  );
  list.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
};
