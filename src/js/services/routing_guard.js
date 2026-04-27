/**
 * Routing Guard Service - EduBytes Samuel
 * Prevents unauthorized access to rooms by checking GameState flags.
 */
(function () {
    const ACCESS_RULES = {
        'outside': { flag: null },
        'hallway': { flag: null },
        'living_room': { flag: null },
        'nursery': { flag: null },
        'crime_scene': { flag: 'crime_scene_unlocked', redirect: 'hallway.html' },
        'nannys_room': { flag: 'nannys_room_unlocked', redirect: 'living_room.html' }
    };

    function checkAccess() {
        const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf("/") + 1).replace(".html", "");
        
        // If it's a known room, check rules
        const rule = ACCESS_RULES[filename];
        if (!rule) return; // Not a protected room

        if (rule.flag) {
            const hasAccess = window.GameState && window.GameState.hasFlag(rule.flag);
            
            if (!hasAccess) {
                console.warn(`[Security] Unauthorized access attempt to ${filename}. Redirecting to ${rule.redirect}...`);
                
                // Optional: Store that we were blocked to show a message in the redirect target
                localStorage.setItem('routing_blocked_msg', `You haven't unlocked the ${filename.replace('_', ' ')} yet.`);
                
                window.location.href = rule.redirect;
                return false;
            }
        }

        // Access granted, update last known room
        localStorage.setItem('edubytes_last_room', filename + '.html');
        return true;
    }

    // Execute immediately
    if (!checkAccess()) {
        // Prevent rest of the page from doing anything if redirecting
        window.stop(); 
    }
})();
