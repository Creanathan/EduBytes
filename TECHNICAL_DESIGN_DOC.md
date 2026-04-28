# EduBytes — Technical Design Standard

This document standardizes the interaction logic and state requirements for Chapter 1, ensuring consistency between the design documents and the JavaScript implementation.

---

## 1. Global State Logic (GameState)

| Flag | Logic Trigger | Purpose |
| :--- | :--- | :--- |
| `talked_to_leduc` | Dialogue with Butler | Tracks initial greeting. |
| `crime_scene_unlocked` | Butler's "Please" option | Reveals the Up arrow to the Crime Scene. |
| `crime_scene_visited` | Crime Scene entry monologue | Tracks progression into the investigation phase. |
| `database_normalized` | 1NF Puzzle completion | Unlocks trust-building dialogue with Butler. |
| `butler_revealed_key` | Dialogue with Butler after normalization | Reveals the location of the key in the Piano. |
| `has_nannys_key` | Piano interaction | Unlocks the Nanny's Room door. |
| `nannys_room_unlocked` | Nanny's Room entry | Tracks completion of Chapter 1. |

---

## 2. Standard Interaction Responses (Chapter 1)

### Hallway Objects
*   **Mirror**: "Maybe I should’ve shaved."
*   **Clock**: "An old Howard Millar grandfather clock."
*   **Butler (Leduc)**: Conditional greeting (4 states: First meeting, Delayed decision, Ready to go, Post-visit).

### Living Room Objects
*   **Piano**: 
    *   *Default*: "I shouldn’t waste any time playing a tune..."
    *   *Normalized*: "Aha! A small silver key with a 'N' engraved on it."
*   **Door (Nanny's)**: 
    *   *Default*: "Locked. Best to ask for a key later."
    *   *With Key*: Unlocks the room and changes the background to the "Open Door" version.
*   **Thomas**: Grieving partner; hiring dialogue.

### Nursery Objects
*   **Cradle**: "Best not to wake them up..."
*   **Family Picture**: "The Dégrasse family. They seem... close. Wait, is that the Nanny in the corner?"
*   **Beatrix (Nanny)**: 2 states (Initial shock/Introduction, and investigative offer).

### Crime Scene Objects
*   **Body**: Investigate Amelia’s physical state (Discoloration clue).
*   **Broken Glass**: Evidence of the residue.
*   **USB Stick**: Item required to import data into the Detective Tablet.
*   **Detective Tablet**: Personal forensic tool.
    *   **Gated Logic**: Upon import, the database appears 'Crashed'.
    *   **1NF Puzzle**: Player must fix atomicity to decrypt the logs.
    *   **Manual Restoration**: Players can edit cells (`contenteditable`), add rows, or delete records to achieve compliance.
    *   **Reimport Safety**: A red 'REIMPORT' button allows wiping the current database to restart the process if an error is made.
    *   **The Reveal**: Successfully reaching 1NF compliance decrypts the entry: *"Piano (UNSUCCESSFUL: Butler hid the key?)"*.

---

## 3. UI Navigation Logic

*   **Left (Hallway)**: Living Room.
*   **Right (Hallway)**: Nursery.
*   **Up (Hallway)**: Crime Scene (Locked by `crime_scene_unlocked`).
*   **Down (Hallway)**: Outside.
*   **Up (Living Room)**: Nanny's Room (Locked by `has_nannys_key`).
 
 ---
 
 ## 4. UI Design Standards
 
 - **Hamburger Menu**: Dedicated to system-level navigation (Home) and settings (Audio). Investigative tools are excluded to maintain immersion.
 - **Evidence Bag (Inventory)**: The primary investigative hub located in the bottom-right.
 - **Detective Tablet**: Integrated as a permanent "Tool" inside the Evidence Bag.
 - **Interaction Model**: Physical items collected in the world (USB, Ledger) are imported through the Tablet interface within the Inventory.
