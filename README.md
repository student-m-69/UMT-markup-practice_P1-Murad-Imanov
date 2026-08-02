# Flora

Responsive HTML/CSS landing page for the Flora flower shop, built from the
[Figma design](https://www.figma.com/design/2Tj16H7IO7dq1ViTvIh57V/Flora?node-id=8203-59903&t=ICMnkHXiu1rtWNrc-0)
as part of the UMT markup practice course (project scopes 1–3, full course).

## Features

- Semantic, valid HTML5 markup (`header`, `nav`, `main`, `footer`, one `h1`)
- Mobile-first responsive layout with breakpoints at 375 / 768 / 1440 px
- Design tokens as CSS custom properties, `modern-normalize` reset
- SVG sprite (`images/icons.svg`) connected via `<svg><use>`
- Multi-layer hero background (gradient + image)
- Mobile menu opened with the `is-open` class
- Product Details and Order modals opened with the `is-open` class
- Images optimized as WebP
- Animate.css for the hero entrance animation

## Stage 2 features

- Retina graphics: `srcset` with @1x/@2x for content images, `<picture>`
  breakpoint sources, `min-resolution: 2dppx` media queries for backgrounds
- Subscribe form in the footer and order form in the modal with semantic
  markup (`label`, descriptive `name`, `type="submit"`, placeholders) and a
  custom license-agreement checkbox styled via the SVG sprite
- Bouquets, bestsellers, and reviews lists rendered fully dynamically from
  API data with template strings and a single `insertAdjacentHTML` call
- HTTP requests through `axios` with `async/await` and error handling
- Load More pagination (`_page`/`_limit` params) and category filtering;
  filter changes reset the page, no duplicated items, empty/end states shown

## API

The page is powered by the real [Flora backend](https://github.com/student-m-69/flora-backend)
(Express + PostgreSQL + Sequelize) deployed at
`https://flora-backend-imanov.onrender.com` — interactive API documentation
is available at
[`/api-docs`](https://flora-backend-imanov.onrender.com/api-docs).

To run the full stack locally, clone the backend repository and start it on
port 3000 (see its README — `npm start` with a local PostgreSQL, or simply
`docker compose up`). Then serve this site from the project root (for
example `npx serve` or `python3 -m http.server 8080`) and open
`http://localhost:8080` — the app automatically switches to
`http://localhost:3000/api` when opened on localhost.

## Structure

- `index.html` — page markup
- `css/styles.css` — all styles (mobile-first)
- `js/menu.js` — mobile menu toggle
- `js/modal.js` — product details and order modal logic
- `js/slider.js` — bestsellers and reviews slider helper
- `js/app.js` — API requests, dynamic rendering, pagination, filters
- `images/` — optimized images with @2x retina versions, SVG sprite, favicon
