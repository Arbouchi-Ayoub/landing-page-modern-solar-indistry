# Modern Multilingual Landing Page

A fast, modern, and responsive landing page built with React, Vite, Tailwind CSS, and Framer Motion. It supports light/dark mode, RTL (Arabic) layout, smooth animated navigation, and a floating quick contact form.

## Features

- Multilingual (English, French, Arabic) with `react-i18next`
- RTL support for Arabic (`dir=auto` and language-aware styles)
- Google Fonts: Poppins (EN/FR) and Tajawal (AR)
- Hero slider with local optimized images
- Lightened overlay on hero images for readability
- Animated, scroll-aware Navbar with progress indicator and active link underline
- Floating Contact Form with animations (Framer Motion)
- Responsive sections: Features, Product Description, Gallery, Testimonials, CTA, Contact
- Dark mode with persistent preference
- Accessibility enhancements and performance optimizations

## Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- React Scroll (`react-scroll`)
- React i18next
- React Icons / Feather Icons

## Project Structure

```
landing-page/
├─ public/
│  ├─ images/hero/            # Local hero images
│  ├─ locales/{en,fr,ar}/     # Translation JSON files
│  └─ ...
├─ src/
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ Navbar.jsx
│  │  │  └─ Footer.jsx
│  │  ├─ sections/
│  │  │  ├─ Hero.jsx
│  │  │  ├─ ProductDescription.jsx
│  │  │  ├─ Features.jsx
│  │  │  ├─ ProductGallery.jsx
│  │  │  ├─ Testimonials.jsx
│  │  │  ├─ CTA.jsx
│  │  │  └─ ContactForm.jsx
│  │  └─ common/
│  │     └─ FloatingContactForm.jsx
│  ├─ App.jsx
│  └─ main.jsx
├─ scripts/
│  └─ download-hero-images.js
├─ index.html
├─ README.md
└─ package.json
```

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Start the dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview production build

```bash
npm run preview
```

## Fonts

- Loaded in `index.html` using Google Fonts CDN:
  - Poppins (Latin) for English/French
  - Tajawal (Arabic)
- Language-aware font application via CSS:
  - `body` uses Poppins
  - `[lang="ar"]` uses Tajawal

## Navigation & Animations

- Smooth scrolling and offset using `react-scroll`
- Active section underline animation (Framer Motion)
- Top scroll progress bar using `useScroll`
- Responsive mobile drawer with staggered animations

## Hero Slider & Overlay

- Local images under `public/images/hero/`
- Background sizing set to `cover` with tuned `backgroundPosition`
- Overlay lightened for improved text contrast

## Floating Contact Form

- Located in `src/components/common/FloatingContactForm.jsx`
- Animated open/close with Framer Motion
- Fields: name, email, phone, message
- Dark mode compatible

## Internationalization

- `public/locales/{en,fr,ar}/translation.json`
- `react-i18next` for translations
- RTL layout supported via `dir="auto"` and CSS where needed

## Preferences (Design Decisions)

- Navbar links: white on top, turn gray/primary on scroll
- Dark mode colors optimized for contrast and hover
- Lighter overlay on hero for better visibility
- Local optimized images for performance
- Accessibility: aria-labels, keyboard focus, color contrast

## Environment & Scripts

- Vite for fast dev/build
- Tailwind for utility-first styling
- `scripts/download-hero-images.js` to assist with asset management

## Contributing

1. Create a feature branch
2. Commit changes with clear messages
3. Open a PR describing changes, screenshots, and testing steps

## License

MIT
# landing-page-modern-solar-indistry
# landing-page-modern-solar-indistry
