# Implementation Plan: Performance Optimization Engine (v5.0)

This plan outlines the steps to implement a high-performance asset preloading and caching system for **NormaLIES**, ensuring instantaneous room transitions and robust offline support.

## User Review Required

> [!IMPORTANT]
> This implementation introduces a **Service Worker** (`sw.js`). Service Workers only function on **HTTPS** (GitHub Pages) or **localhost**. They will not work if the user opens the `.html` files directly from the file system (e.g., `C:/.../index.html`).

> [!WARNING]
> Preloading 45MB of images will consume significant memory and bandwidth initially. We must ensure the preloader prioritizes the "Immediate Next Room" to prevent blocking the game startup.

---

## Proposed Changes

### Core: Service Worker Architecture

#### [NEW] [sw.js](file:///c:/Users/Jonat/OneDrive/Documenten/Project%20NF/Start/EduBytes/sw.js)
- Implement a `Cache-First` strategy.
- Pre-cache all UI elements and the first two rooms (`outside` and `hallway`).
- Handle periodic cache purging to ensure users get the latest version of the game when you push updates.

#### [MODIFY] [index.html](file:///c:/Users/Jonat/OneDrive/Documenten/Project%20NF/Start/EduBytes/index.html)
- Add Service Worker registration logic.
- Ensure the registration happens after the window has loaded to avoid blocking the main thread.

---

### Logic: Aggressive Preloader

#### [MODIFY] [dynamic_loading.js](file:///c:/Users/Jonat/OneDrive/Documenten/Project%20NF/Start/EduBytes/src/js/components/dynamic_loading.js)
- Replace the current `rel="prefetch"` logic with an `AssetManager` class.
- **Categorization**: Map all assets (Rooms, Characters, Cutscenes, UI).
- **Priority Loading**:
    1. **High**: Background and characters of the *next* possible rooms.
    2. **Medium**: All UI icons and dialogue portraits.
    3. **Low**: Backgrounds of distant rooms and cutscene frames.
- **Path Resolver**: Fix the relative path logic for `src/rooms/` vs root.

---

### Assets: Path Correction

#### [MODIFY] [dynamic_loading.js](file:///c:/Users/Jonat/OneDrive/Documenten/Project%20NF/Start/EduBytes/src/js/components/dynamic_loading.js)
- Fix the path for `crime_scene_bureau_USB.png`.
- Add `living_room_open.png` to the prefetch list.

---

## Verification Plan (Checks)

### Automated Tests (Console & Network)
- [ ] **Check 1: SW Registration**: Verify `[ServiceWorker] Registered successfully` appears in the browser console.
- [ ] **Check 2: Cache Population**: Open DevTools -> Application -> Cache Storage. Verify `edubytes-assets-v1` contains all mapped PNGs.
- [ ] **Check 3: Network Interception**: Go to Hallway -> Living Room. Check the Network tab. The "Size" column should read `(from ServiceWorker)` or `(from disk cache)`.

### Manual Verification
- [ ] **Performance Check**: Rapidly click between the Hallway and Living Room. There should be **no flicker** or white screen during the background swap.
- [ ] **Offline Check**: (In DevTools) Check "Offline" mode. Refresh the page. The game should still load and backgrounds should still appear.
- [ ] **Mobile Simulation**: Check the performance using a "Slow 3G" throttling profile to ensure Priority Loading works as intended.

---

## Open Questions
1. Do you want a visual "Loading Assets..." progress bar on the main menu, or should it all happen invisibly in the background?
2. Should we include the audio files (`src/assets/audio/`) in the preloading plan as well?
