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

## 3. Best Practice: Image Compression
To truly optimize for GitHub Pages, images should be compressed.

- **Target Format**: **WebP** (offers ~80% reduction in file size with no quality loss).
- **Target Size**: Under 800KB per background.
- **Impact**: Reduces total game load from 45MB to ~5MB, making transitions instantaneous even on slower connections.

## 4. Implementation Steps
1. [ ] **Correction**: Update `dynamic_loading.js` with the correct filenames found on disk.
2. [ ] **Logic**: Replace `rel="prefetch"` with the `new Image()` preloader.
3. [ ] **Scope**: Ensure the preloader runs as a global service so it doesn't restart on every page.

---
*Status: Planned (Pending Implementation)*
