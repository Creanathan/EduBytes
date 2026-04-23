/**
 * Dialog Data Store - Chapter 1
 * All dialog content is defined here in one place.
 * Exact script from background documents:
 *   - Chapter 1 - Interacties met locaties.docx
 *   - Chapter 1 - Interacties met personen.docx
 *   - Chapter 1 - Interacties met dingen.docx
 *
 * Conditional interactions use an array of variant objects.
 * The dialog engine picks the first variant whose condition evaluates to true.
 * Conditions use GameState.hasFlag('...') and Inventory.hasItem('...').
 */

const DIALOGS = {

    // ────────────────────────────────────────
    // ROOM ENTRY DIALOGS (auto-play on arrive)
    // ────────────────────────────────────────

    outside: [
        {
            speaker: "Narrator",
            lines: [
                "You arrive at the Souvellier estate. The iron gate creaks open.",
                "A cold breeze sweeps across the gravel path leading to the front door.",
                "Time to begin the investigation."
            ]
        }
    ],

    // Hallway: Butler greets you on first entry (conditional auto-dialog removed;
    // Butler is an interactive object the player clicks on instead).
    hallway: [],

    // Living room: Thomas greets you (first visit or repeat)
    living_room: [
        {
            // First interaction: full introduction
            speaker: "Thomas Souvellier",
            lines: [
                "You must be detective Dekoning. We... spoke on the phone? Thomas Souvellier.",
                "Please help us. We've already tried going to the police, but my father doesn't think they have the evidence to find out who did this.",
                "Please find whoever did this. Please."
            ],
            options: [
                { label: "I'll do my best.", action: "setFlag:talked_to_thomas|exit" }
            ]
        }
    ],

    // Nursery: Beatrix greets on entry (only after talking to butler)
    nursery: [
        {
            speaker: "Beatrix Lémur",
            lines: [
                "Oh, it's truly horrible what happened with sweet little Amelia!",
                "How could anyone have done something like this to such a warm soul? It's all truly horrendous!"
            ],
            options: [
                { label: "And you are?", action: "exit" },
                { label: "Leave.", action: "exit" }
            ]
        }
    ],

    crime_scene: [
        {
            speaker: "Det. Louis Dekoning",
            lines: [
                "The air in here is heavy... colder than the rest of the house.",
                "And there she is. Amelia Souvellier. Found earlier this morning by the butler.",
                "I need to be careful. Every misplaced footprint could cost us the case.",
                "Time to look for anything the police might have missed."
            ],
            options: [
                { label: "Investigate", action: "setFlag:crime_scene_visited|exit" }
            ]
        }
    ],

    nannys_room: [],

    // ────────────────────────────────────────
    // INTERACTIVE OBJECT INTERACTIONS
    // ────────────────────────────────────────
    interactions: {

        // ── The Butler (Jeanne-Paul Leduc) ──
        // Supports three narrative states from the background doc:
        //   1. First interaction → full welcome, player can unlock crime scene
        //   2. Crime scene unlocked but not yet visited
        //   3. Repeat visit, crime scene already investigated → nursery key
        leduc: [
            {
                // State 1: First interaction – crime scene not yet unlocked
                condition: "!GameState.hasFlag('crime_scene_unlocked')",
                speaker: "Jeanne-Paul Leduc (Butler)",
                lines: [
                    "Welcome, good sir. You must be the befamed detective Dekoning?",
                    "We thank you for coming on such short notice. This is the first time something like this has ever happened at the Degrasse mansion and everyone is completely taken aback.",
                    "Shall I take you to the crime scene? Or would you rather talk to the people present first?"
                ],
                options: [
                    { label: "Please.", action: "setFlag:crime_scene_unlocked|showBtn:btn-top|exit" },
                    { label: "Later.", action: "exit" }
                ]
            },
            {
                // State 2: Crime scene unlocked but not yet visited
                condition: "GameState.hasFlag('crime_scene_unlocked') && !GameState.hasFlag('crime_scene_visited')",
                speaker: "Jeanne-Paul Leduc (Butler)",
                lines: [
                    "Forgive everyone for being completely taken aback. It is a really unusual situation.",
                    "The crime scene is just up ahead."
                ],
                options: [
                    { label: "Thanks.", action: "exit" }
                ]
            },
            {
                // State 3: Crime scene visited – offer nursery key
                condition: "GameState.hasFlag('crime_scene_visited')",
                speaker: "Jeanne-Paul Leduc (Butler)",
                lines: [
                    "Are you ready to investigate further?",
                    "The Nursery? It is locked for the children's safety, especially now.",
                    "But I suppose you must see it. Here is the spare key. Please be careful."
                ],
                options: [
                    { label: "Take the Key", action: "addItem:nursery_key|exit" },
                    { label: "Thank you.", action: "exit" }
                ]
            }
        ],

        // ── Beatrix Lémur (Nanny – in Nursery) ──
        beatrix: [
            {
                // First interaction
                condition: "!GameState.hasFlag('talked_to_beatrix')",
                speaker: "Beatrix Lémur",
                lines: [
                    "Oh, it's truly horrible what happened with sweet little Amelia!",
                    "How could anyone have done something like this to such a warm soul? It's all truly horrendous!"
                ],
                options: [
                    { label: "And you are?", action: "setFlag:talked_to_beatrix|exit" },
                    { label: "Leave.", action: "exit" }
                ]
            },
            {
                // After asking who she is
                condition: "GameState.hasFlag('talked_to_beatrix')",
                speaker: "Beatrix Lémur",
                lines: [
                    "Please let me know if there is anything I can do to help with the investigation.",
                    "I've been around for quite a while and am probably the person that knows the family the best.",
                    "No one should have the right to be so bad to others..."
                ],
                options: [
                    { label: "Of course.", action: "exit" }
                ]
            }
        ],

        // Beatrix introduction answer (triggered after player asks "And you are?")
        beatrix_intro: {
            speaker: "Beatrix Lémur",
            lines: [
                "My name is Beatrix Lémur, the nanny of the triplets.",
                "Poor things, having to grow up without a mother.",
                "And poor mister Souvellier! I can't even imagine how he must feel right now. He is such a sensitive soul..."
            ],
            options: [
                { label: "Thank you.", action: "setFlag:talked_to_beatrix|exit" }
            ]
        },

        // ── Thomas Souvellier (repeat interaction) ──
        thomas: [
            {
                condition: "!GameState.hasFlag('talked_to_thomas')",
                speaker: "Thomas Souvellier",
                lines: [
                    "You must be detective Dekoning. We... spoke on the phone? Thomas Souvellier.",
                    "Please help us. We've already tried going to the police, but my father doesn't think they have the evidence to find out who did this.",
                    "Please find whoever did this. Please."
                ],
                options: [
                    { label: "I'll do my best.", action: "setFlag:talked_to_thomas|exit" }
                ]
            },
            {
                condition: "GameState.hasFlag('talked_to_thomas')",
                speaker: "Thomas Souvellier",
                lines: [
                    "Please find whoever did this. Please."
                ],
                options: [
                    { label: "I'll do my best.", action: "exit" }
                ]
            }
        ],

        // ── Interactable Objects ──
        mirror: {
            speaker: "Det. Louis Dekoning",
            lines: ["Maybe I should've shaved. This case is already taking its toll on me."],
            options: [{ label: "Close", action: "exit" }]
        },
        clock: {
            speaker: "Det. Louis Dekoning",
            lines: [
                "An old Howard Millar grandfather clock. Still ticking perfectly.",
                "It's one of the few things in this house that doesn't feel like it's hiding something."
            ],
            options: [{ label: "Close", action: "exit" }]
        },
        piano: {
            speaker: "Det. Louis Dekoning",
            lines: ["I shouldn't waste any time playing a tune. There is a murderer on the loose."],
            options: [{ label: "Close", action: "exit" }]
        },
        door_nannys_room: {
            speaker: "Det. Louis Dekoning",
            lines: [
                "Locked. Best to ask for a key later."
            ],
            options: [{ label: "Close", action: "exit" }]
        },
        door_nannys_room_unlocked: {
            speaker: "Det. Louis Dekoning",
            lines: [
                "The Nanny's room. I have the key.",
                "Let's go inside."
            ],
            options: [
                { label: "Enter", action: "goTo:nannys_room.html" },
                { label: "Wait", action: "exit" }
            ]
        },
        cradle: {
            speaker: "Det. Louis Dekoning",
            lines: ["Best not to wake them up... The atmosphere in here is already heavy enough."],
            options: [{ label: "Close", action: "exit" }]
        },
        family_picture: {
            speaker: "Det. Louis Dekoning",
            lines: [
                "The Degrasse family. They seem... close. At least in this frame.",
                "Wait, is that the Nanny in the corner with the buggy?"
            ],
            options: [{ label: "Close", action: "exit" }]
        },
        body: {
            speaker: "Det. Louis Dekoning",
            lines: [
                "Amelia Souvellier. Still wearing her evening gown.",
                "There is a strange discoloration around her lips...",
                "This wasn't a natural death."
            ],
            options: [{ label: "Close", action: "exit" }]
        },
        broken_glass: {
            speaker: "Det. Louis Dekoning",
            lines: [
                "A crystal wine glass shard. There's a sticky residue on it.",
                "I should keep this. It might contain traces of whatever was in that drink."
            ],
            options: [{ label: "Close", action: "exit" }]
        },
        locked_safe: {
            speaker: "Det. Louis Dekoning",
            lines: [
                "The safe is empty. Thomas said his mother kept the family database ledgers here.",
                "If someone took those, they were looking for more than just money."
            ],
            options: [{ label: "Close", action: "exit" }]
        }
    }
};
