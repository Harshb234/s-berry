# 🍓 S-Berry — Strawberry Bliss

> A high-end, cinematic scrollytelling landing page for **S-Berry**, a premium cold-pressed juice brand. Built with React, GSAP, and Vite.

![S-Berry Preview](./public/vite.svg)

---

## ✨ Overview

**S-Berry — Strawberry Bliss** is an immersive, scroll-driven product showcase website designed to replicate the kind of premium, Apple-style product reveal experiences seen on award-winning websites. Every element — from the animated bottle reveal to the ingredient deep-dive — is choreographed using GSAP's ScrollTrigger for buttery-smooth, frame-perfect animations.

The site features a cinematic dark aesthetic, a custom animated cursor, scroll-progress tracking, a dynamic particle field, and a fully animated hero with a frame-by-frame bottle sequence.

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🎞️ **Scroll-Driven Bottle Animation** | 192 JPEG frames play like a video as the user scrolls, creating a cinematic 3D product reveal |
| ✨ **Particle Field** | Canvas-based animated particle system layered over the hero section |
| 🖱️ **Custom Cursor** | Smooth magnetic cursor with hover-expand effects on interactive elements |
| 📊 **Scroll Progress Bar** | Thin progress bar at the top of the viewport tracks scroll depth |
| 🏷️ **Corner Labels** | Four animated corner info labels with parallax depth |
| 🌿 **Ingredients Section** | Scroll-triggered reveal of ingredients and product stats with staggered animations |
| 📜 **Scrollytelling Sections** | Headline, tagline, and ingredients sections animate in on scroll |
| 🔢 **"NEW LAUNCH 2025" Badge** | Floating rotating badge element |
| 📱 **Glassmorphism Navbar** | Frosted glass navigation bar |

---

## 🧱 Tech Stack

- **[React 19](https://react.dev/)** — UI component architecture
- **[GSAP 3 + ScrollTrigger](https://gsap.com/)** — All animations and scroll choreography
- **[Vite 6](https://vitejs.dev/)** — Lightning-fast build tool and dev server
- **Vanilla CSS** — Custom design system with CSS variables, gradients, and glassmorphism
- **HTML5 Canvas** — Particle field and frame-sequence animation

---

## 📁 Project Structure

```
nano-banana/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Glassmorphism sticky navbar
│   │   ├── Hero.jsx             # Main hero with scroll animations + corner labels
│   │   ├── BottleCanvas.jsx     # Scroll-driven 192-frame bottle animation (canvas)
│   │   ├── ParticleField.jsx    # Canvas-based particle system
│   │   ├── HeadlineSection.jsx  # Animated marketing headline section
│   │   ├── TaglineSection.jsx   # Brand tagline with scroll reveal
│   │   └── IngredientsSection.jsx # Ingredient cards + product stats
│   ├── App.jsx                  # Root app — cursor, progress bar, layout
│   ├── index.css                # Full custom design system
│   └── main.jsx                 # React entry point
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🖼️ Sections

1. **Hero** — Full-screen cinematic opening with headline *"Strawberry Bliss."*, CTA buttons, corner product info labels, and a scroll-hint indicator.
2. **Bottle Reveal** — As the user scrolls through 600vh of scroll-space, 192 image frames animate the bottle in a 3D-like reveal sequence.
3. **Headline Section** — Bold marketing copy fades in with split-word animations.
4. **Tagline Section** — Pull-quote style brand positioning statement.
5. **Ingredients Section** — Two-column layout showcasing natural ingredients and product stats (100% natural, 0g additives, 180mg Vitamin C, 4× antioxidants).
6. **Footer** — Minimal brand footer with links.

---

## ⚙️ Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Harshb234/nano-banana.git
cd nano-banana

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Other Commands

```bash
npm run build     # Build for production (output: /dist)
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

---

## 🎨 Design System

The design uses a carefully curated dark aesthetic:

| Token | Value |
|---|---|
| Background | `#0a0209` (near-black deep plum) |
| Accent Pink | `#f8a4b0` (soft strawberry rose) |
| Text Primary | `#ffffff` |
| Text Muted | `rgba(255,255,255,0.45)` |
| Font | `Inter` (Google Fonts) |
| Glass Effect | `backdrop-filter: blur(20px)` |

---

## 📦 Assets

The `strawberry_j/` folder (sibling to this project, not included in the repo by default) contains the 192 JPEG frames (`ezgif-frame-001.jpg` → `ezgif-frame-192.jpg`) used for the bottle scroll animation. Place them at the path expected by `BottleCanvas.jsx` or update the path accordingly.

> **Note:** The frame images are not committed to Git due to their size. You may need to add them manually or host them separately.

---

## 🧑‍💻 Author

**Harsh Bambatkar**
- GitHub: [@Harshb234](https://github.com/Harshb234)

---

## 📄 License

This project is private and not licensed for public use or distribution.

---

<div align="center">
  <em>Crafted with 🍓 and a love for premium design.</em>
</div>
