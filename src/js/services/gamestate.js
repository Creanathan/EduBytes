/**
 * GameState Service
 * Manages global narrative flags and story progression states.
 * Persists data via localStorage so flags survive page reloads.
 */
(function() {
    const STORAGE_KEY = 'edubytes_gamestate';

    class GameStateService {
        constructor() {
            this.flags = {};
            this.load();
        }

        load() {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    this.flags = JSON.parse(stored);
                }
            } catch (e) {
                console.error("Failed to load game state", e);
                this.flags = {};
            }
        }

        save() {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.flags));
            } catch (e) {
                console.error("Failed to save game state", e);
            }
        }

        // Set a string or boolean flag
        setFlag(key, value = true) {
            this.flags[key] = value;
            this.save();
        }

        // Check if a flag exists and is truthy
        hasFlag(key) {
            return !!this.flags[key];
        }

        // Remove a flag
        clearFlag(key) {
            delete this.flags[key];
            this.save();
        }

        // Clear all state (for restarting)
        reset() {
            this.flags = {};
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    // Expose globally
    window.GameState = new GameStateService();
})();
