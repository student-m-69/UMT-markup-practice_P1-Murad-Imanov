# Flora

Responsive HTML/CSS landing page for the Flora flower shop, built from the
[Figma design](https://www.figma.com/design/zEp8BvPrf01rSdrekv9cXc/Flora--Copy-?node-id=5999-10563)
as part of the UMT markup practice course (project scope 1, topics 1–12).

## Features

- Semantic, valid HTML5 markup (`header`, `nav`, `main`, `footer`, one `h1`)
- Mobile-first responsive layout with breakpoints at 375 / 768 / 1440 px
- Design tokens as CSS custom properties, `modern-normalize` reset
- SVG sprite (`images/icons.svg`) connected via `<svg><use>`
- Multi-layer hero background (gradient + image)
- Mobile menu opened with the `is-open` class
- Images optimized as WebP
- Animate.css for the hero entrance animation

## Structure

- `index.html` — page markup
- `css/styles.css` — all styles (mobile-first)
- `js/menu.js` — mobile menu toggle
- `images/` — optimized images, SVG sprite, favicon
