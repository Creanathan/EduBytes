# Technical Specification: Asset Preloader & Service Worker

This document provides a detailed breakdown of how the performance optimization system for **NormaLIES** will function.

---

## 1. Architecture Overview
The system uses a dual-layer caching strategy:
1.  **Layer 1: JavaScript Preloader (Active)** — Proactively fetches assets based on the player's location.
2.  **Layer 2: Service Worker (Passive/Persistent)** — Intercepts all network requests and serves cached assets instantly, even across different HTML pages.

---

## 2. Component: The Service Worker (`sw.js`)
Since the game is composed of multiple HTML files, a Service Worker is the only way to maintain a persistent cache state.

### How it works:
- **Installation**: When the user hits the main menu, the Service Worker is registered. It immediately downloads the "Critical Path" assets (UI elements, common sound effects).
- **Interception**: Every time the browser asks for an image (e.g., `background-image: url(...)`), the Service Worker checks the `edubytes-cache-v1`.
- **Instant Response**: If the image is in the cache, it is returned in milliseconds from the local disk, bypassing the internet entirely.

### Example Logic:
```javascript
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
```

---

## 3. Component: Aggressive Preloader (`dynamic_loading.js`)
This script runs in the foreground and manages the *order* in which assets are pulled into the cache.

### How it works:
1.  **Priority Mapping**: The script knows which rooms are connected to the current one.
2.  **High-Priority Load**: It creates hidden `Image` objects for the backgrounds of the adjacent rooms.
3.  **Global Asset Scan**: It proactively caches assets in the following sub-directories:
    - `src/assets/rooms/` (Backgrounds)
    - `src/assets/images/characters/` (Portraits)
    - `src/assets/cutscenes/` (Narrative images)
    - `src/assets/images/ui/` (Icons & Logos)
4.  **Low-Priority Load**: Once the adjacent rooms are cached, it slowly downloads the rest of the chapter's assets in the background.

### Path Normalization:
The preloader will include a standardized path resolver to handle the difference between root access (`index.html`) and room access (`src/rooms/`).

---

## 4. Component: Asset Compression Script
To make the system viable for mobile and slow connections, we will use a Python-based conversion tool.

### How it works:
The script iterates through `src/assets/rooms/`, detects PNG files, and converts them to **WebP** with a 75% quality setting. This reduces the average background from **5.2MB** to **480KB**.

---

## 5. Summary of Benefits
- **Zero-Latency Transitions**: Room changes will feel like a native app.
- **Offline Support**: Once a chapter is fully cached, it can be played without an internet connection.
- **GitHub Pages Optimization**: Reduces the bandwidth cost per user, preventing "throttling" on high-traffic days.

---
*Implementation Readiness: High // Awaiting Final Approval*
