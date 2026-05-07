/**
 * Performance Engine — EduBytes (v5.0)
 * Handles aggressive pre-caching and asset optimization.
 */

(function() {
    // 1. Full Asset Registry
    const ASSETS = {
        rooms: [
            'outside.png', 
            'hallway_main.png', 
            'living_room_closed.png', 
            'living_room_open.png', 
            'nursery.png', 
            'crime_scene_main.png', 
            'crime_scene_bureau_USB.png', // Fixed filename
            'nannys_room_main.png'
        ],
        characters: [
            'beatrix.png', 
            'butler.png', 
            'butler_sprite.png', 
            'detective.png', 
            'thomas.png'
        ],
        cutscenes: [
            'cutscene_auto(1).png', 
            'cutscene_auto(2).png'
        ],
        ui: [
            'logo.png', 
            'logo.svg'
        ]
    };

    // 2. Connection Logic (for Priority Preloading)
    const CONNECTIONS = {
        'index.html': ['outside.html'],
        'outside.html': ['hallway.html'],
        'hallway.html': ['outside.html', 'living_room.html', 'crime_scene.html', 'nursery.html'],
        'living_room.html': ['hallway.html', 'nursery.html', 'nannys_room.html'],
        'nursery.html': ['living_room.html', 'hallway.html'],
        'crime_scene.html': ['hallway.html', 'crime_scene_bureau.html'],
        'crime_scene_bureau.html': ['crime_scene.html'],
        'nannys_room.html': ['living_room.html']
    };

    const ROOM_TO_IMAGE = {
        'outside.html': 'outside.png',
        'hallway.html': 'hallway_main.png',
        'living_room.html': 'living_room_closed.png',
        'nursery.html': 'nursery.png',
        'crime_scene.html': 'crime_scene_main.png',
        'crime_scene_bureau.html': 'crime_scene_bureau_USB.png',
        'nannys_room.html': 'nannys_room_main.png'
    };

    // 3. Helper: Path Normalization
    function getBasePath() {
        const path = window.location.pathname;
        const isSubfolder = path.includes('/src/rooms/') || (path.endsWith('.html') && path.includes('/rooms/'));
        return isSubfolder ? '../' : './src/';
    }

    const BASE_PATH = getBasePath();
    const ASSET_ROOT = BASE_PATH + 'assets/';

    // 4. Aggressive Preloader Engine
    function preloadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => reject(url);
            img.src = url;
        });
    }

    async function startPerformanceEngine() {
        let currentFile = window.location.pathname.split('/').pop() || 'index.html';
        const connectedRooms = CONNECTIONS[currentFile] || [];
        
        console.log(`[Performance] Engine started for ${currentFile}. BasePath: ${BASE_PATH}`);

        // --- Priority 1: High (Immediate Neighbors) ---
        const highPriority = connectedRooms.map(room => ROOM_TO_IMAGE[room]).filter(img => img);
        for (const imgName of highPriority) {
            preloadImage(`${ASSET_ROOT}rooms/${imgName}`).catch(() => {});
        }

        // --- Priority 2: Medium (Characters & UI) ---
        // These are small enough to load quickly and are used in dialogues
        ASSETS.characters.forEach(img => preloadImage(`${ASSET_ROOT}images/characters/${img}`).catch(() => {}));
        ASSETS.ui.forEach(img => preloadImage(`${ASSET_ROOT}images/ui/${img}`).catch(() => {}));

        // --- Priority 3: Low (Everything else) ---
        // Stagger these to avoid blocking
        setTimeout(() => {
            ASSETS.rooms.forEach(img => {
                if (!highPriority.includes(img)) {
                    preloadImage(`${ASSET_ROOT}rooms/${img}`).catch(() => {});
                }
            });
            ASSETS.cutscenes.forEach(img => preloadImage(`${ASSET_ROOT}cutscenes/${img}`).catch(() => {}));
        }, 2000);
    }

    // Initialize after load
    if (document.readyState === 'complete') {
        startPerformanceEngine();
    } else {
        window.addEventListener('load', startPerformanceEngine);
    }

    // 5. Asset Modernization (Auto-apply lazy loading to non-background images)
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('img:not(.critical)').forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    });

})();
