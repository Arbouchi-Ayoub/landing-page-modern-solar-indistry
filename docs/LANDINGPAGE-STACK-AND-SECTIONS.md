****# Landing Page Documentation

This document describes the technology stack, main sections, design preferences, and implementation notes for the landing page.

## 1) Tech Stack

- React (Vite)
- Tailwind **CSS**
- Framer Motion (animations)
- React Scroll (smooth section navigation / active spy)
- React i18next (i18n)
- React Icons / Feather Icons (icons)
- Google Fonts: Poppins (Latin), Tajawal (Arabic)

## 2) Global Preferences

- Light/Dark mode with persistent preference (`localStorage`)
- Language support: English, French, Arabic (RTL-aware)
- Fonts loaded via Google Fonts in `index.html`, applied by language
- Smooth, modern animations and transitions (60fps goal)
- Accessibility: labels, color contrast, keyboard focus
- Performance: local optimized images, careful use of motion

## 3) Sections Overview

- Navbar (`src/components/layout/Navbar.jsx`)
  - Transparent at top, solid on scroll with backdrop blur
  - White links initially; change color on scroll
  - Active link underline animation
  - Scroll progress indicator at top
  - Mobile drawer with staggered menu items

- Hero (`src/components/sections/Hero.jsx`)
  - Local images from `public/images/hero/`
  - `background-size: cover`, custom `backgroundPosition` per slide
  - Lighter overlay for better readability in light/dark mode
  - Framer Motion transitions
  - Floating quick contact form appears above hero (separate component)

- Product Description (`src/components/sections/ProductDescription.jsx`)
  - Animated content blocks
  - Responsive image with `object-cover`

- Features (`src/components/sections/Features.jsx`)
  - Grid layout, motion-on-view

- Product Gallery (`src/components/sections/ProductGallery.jsx`)
  - Responsive gallery with progressive reveal animations

- Testimonials (`src/components/sections/Testimonials.jsx`)
  - Cards with motion and subtle shadows

- CTA (`src/components/sections/CTA.jsx`)
  - Prominent gradient button, responsive spacing

- Contact Form (`src/components/sections/ContactForm.jsx`)
  - Traditional section form (optional if floating form is used)

- Floating Contact Form (`src/components/common/FloatingContactForm.jsx`)
  - Button at bottom-right; expands to form with Framer Motion
  - Fields: name, email, phone, message
  - Submission feedback state

## 4) Styling & Theming

- Color system based on Tailwind with a `primary` accent
- Hover/focus states with subtle scale and shadow
- Dark mode adjustments for borders, backgrounds, and text

## 5) Internationalization

- Translations in `public/locales/{en,fr,ar}/translation.json`
- `dir="auto"` on `<html>` to respect RTL languages
- `[lang="ar"]` font family set to Tajawal

## 6) Implementation Notes

- Use `react-scroll` props: `smooth`, `duration`, `offset`, `spy` for active link
- Keep motion props lightweight; avoid heavy reflows
- Prefer local images in `public/` for performance and caching
- Keep accessibility in mind for icons/buttons/links

## 7) Future Enhancements

- Form backend integration (email/API)
- Lazy-load sections/images for further performance gains
- More granular motion variants per section
