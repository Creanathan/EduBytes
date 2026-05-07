# Asset Optimization & Preloading Plan

This document outlines the strategy for eliminating the "slow feel" of room transitions by pre-caching large background assets.

## 1. The Problem
- **Asset Size**: Room backgrounds are ~5MB PNGs. Totaling ~45MB for Chapter 1.
- **Latency**: Each room is a separate HTML file. Browsers only start downloading the CSS `background-image` once the new page is parsed.
- **Passive Loading**: The current `rel="prefetch"` method is low-priority and often ignored by browsers during active navigation.

## 2. Proposed Solution: Aggressive JS Preloader
Instead of relying on browser "hints," we will implement a high-priority JavaScript preloader.

### Technical Implementation:
We will create or update `src/js/components/dynamic_loading.js` with a global `AssetPreloader`.

**Key features:**
1. **Full Asset Map**: A hardcoded list of all critical backgrounds (including state-changes like `living_room_open.png`).
2. **Aggressive Loading**: Uses `new Image().src = ...` to force a high-priority download into the browser's persistent cache.
3. **Trigger Point**: Preloading starts on `index.html` (Main Menu) or `outside.html` (Intro) immediately after the current page's critical assets are ready.
4. **Path Correction**: Standardizing paths to avoid 404s (e.g., fixing the `crime_scene_bureau_USB.png` reference).

### Pseudo-code:
```javascript
const ASSETS = [
    'outside.png',
    'hallway_main.png',
    'living_room_closed.png',
    'living_room_open.png',
    // ... all others
];

function aggressivePreload() {
    ASSETS.forEach(file => {
        const img = new Image();
        img.src = `../assets/rooms/${file}`;
    });
}
```

## 3. Critical Validation: Feasibility & Risks

### A. The "Multi-Page" Bottleneck
The biggest risk to the current plan is that our game consists of **separate HTML files**. 
- When you navigate from `outside.html` to `hallway.html`, the entire JavaScript state is wiped.
- Any `new Image()` objects we created to "force" a download are destroyed.
- **The Success Factor**: We are 100% dependent on the browser's disk cache. If the browser decides 45MB of images is too much to keep in memory, it will purge them, and the "slowness" will return.

### B. Bandwidth "Hogging"
If we start loading 45MB of images as soon as the user hits the main menu:
- On a slow connection, the actual game assets (like the first room's background) might be delayed because the preloader is stealing the bandwidth.

## 4. Better Method: Service Workers (Persistent Cache)
For a multi-page game, the "pro" method is a **Service Worker**.
- **Persistent**: A Service Worker lives in the background even when you switch pages.
- **Cache Storage API**: It allows us to explicitly store the 5MB images in a dedicated cache that is *not* easily purged by the browser.
- **Interception**: It can intercept the request for `hallway_main.png` and serve it instantly from the local cache, making the room switch feel like an app.

## 5. The "Critical Must-Have": WebP Compression
Regardless of the code method (JS Preload or Service Worker), **45MB is too heavy**.
- **Current PNGs**: ~5MB each.
- **Target WebP**: ~400KB - 600KB each.
- **Result**: Even without a preloader, a 500KB image loads in milliseconds on most connections. **This is the single most important fix for "perceived speed."**

## 6. Revised Implementation Strategy
1. **Priority 1**: Convert all 5MB PNGs to WebP (80-90% size reduction).
2. **Priority 2**: Update `dynamic_loading.js` to use an aggressive preloader but *prioritize* the next logical room.
3. **Priority 3 (Optional)**: Implement a basic Service Worker if Level 1 and 2 aren't enough.

---
*Status: Validated & Critically Reviewed*
