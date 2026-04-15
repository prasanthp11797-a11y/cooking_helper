# 🍛 What to Cook Today?

**Daily Cooking Decision Assistant for South Indian Homemakers**

A production-grade Progressive Web App (PWA) designed for Tamil Nadu and Andhra-style home cooking. This is NOT a recipe app — it's a **daily cooking decision assistant** that helps you quickly decide what to cook based on available ingredients.

---

## ✨ Features

- **🥘 Ingredient-Based Suggestions** — Tap ingredients you have, get instant dish recommendations
- **🔍 Smart Filters** — Veg/Non-veg, Quick (<20 min), Easy, Spicy, Tamil/Andhra
- **🎲 Surprise Me** — Get a random dish suggestion with cuisine rotation
- **📋 Cooking History** — Track what you cooked, avoid repetition for 3 days
- **❤️ Favorites** — Save dishes for quick access
- **👩‍🍳 Minimal Recipes** — 3–5 short steps, no lengthy instructions
- **📱 Installable PWA** — Works offline, installs like a native app
- **🌙 Dark Mode** — Automatic based on system preference

## 🍽️ Dataset

**32 authentic South Indian home-style dishes:**

| Tamil Nadu (16) | Andhra (16) |
|---|---|
| Sambar, Tomato Rasam | Pappu, Tomato Pappu |
| Keerai Kootu, Beans Poriyal | Gongura Pachadi, Bendakaya Fry |
| Potato Fry, Kara Kuzhambu | Gutti Vankaya, Andhra Chicken Curry |
| Mor Kuzhambu, Egg Poriyal | Andhra Egg Curry, Pulusu |
| Chicken Chettinad, Vendakkai Poriyal | Dondakaya Fry, Andhra Aloo Fry |
| Paruppu Usili, Thakkali Kuzhambu | Tomato Pachadi, Pesarattu |
| Vazhaikai Varuval, Cabbage Poriyal | Gongura Chicken, Vankaya Pulusu |
| Drumstick Sambar, Chettinad Egg Curry | Natu Kodi Pulusu, Senaga Pindi Kura |

## 🧠 Suggestion Engine

The suggestion engine ranks dishes using:

1. **Ingredient Match** — ≥60% ingredient overlap required
2. **Effort Level** — Lower effort dishes get a slight boost
3. **Cuisine Rotation** — Balances Tamil/Andhra in top 5 results
4. **Recent History** — Avoids dishes cooked in the last 3 days

---

## 🚀 How to Run

### Option 1: Simple HTTP Server (Python)

```bash
cd "cooking helper"
python -m http.server 8080
```

Then open: **http://localhost:8080**

### Option 2: Node.js HTTP Server

```bash
npx -y http-server "cooking helper" -p 8080 -c-1
```

Then open: **http://localhost:8080**

### Option 3: VS Code Live Server

1. Install the **Live Server** extension
2. Right-click `index.html` → **Open with Live Server**

> ⚠️ **Note:** PWA features (Service Worker, Install) require HTTPS or `localhost`. They won't work from a `file://` URL.

---

## 📲 How to Install as PWA

### On Android (Chrome):

1. Open the app URL in Chrome
2. Tap the **"Install App"** banner, OR
3. Tap the **⋮ menu** → **"Install app"** / **"Add to Home Screen"**

### On Desktop (Chrome/Edge):

1. Open the app URL
2. Click the **install icon** (📲) in the address bar, OR
3. Click the install button in the app header

### On iOS (Safari):

1. Open in Safari
2. Tap **Share** → **"Add to Home Screen"**

---

## 📁 Project Structure

```
cooking helper/
├── index.html        # App shell / HTML structure
├── styles.css        # Complete design system
├── app.js            # Application logic & suggestion engine
├── data.js           # 32 dish dataset + ingredient catalog
├── manifest.json     # PWA manifest for installability
├── sw.js             # Service worker (offline caching)
├── icons/
│   ├── icon-192.png  # App icon 192×192
│   └── icon-512.png  # App icon 512×512
└── README.md         # This file
```

## 🛠️ Tech Stack

- **Vanilla JavaScript** — No frameworks, no build step
- **CSS Custom Properties** — Full design token system
- **LocalStorage** — Persistent history & favorites
- **Service Worker** — Cache-first offline strategy
- **Web App Manifest** — PWA installability

## 👤 Target User

South Indian homemakers (35–65 age group) who need quick, daily cooking decisions with minimal typing and maximum simplicity.

---

*Built with ❤️ for South Indian kitchens*
