# Educational Mechanic: 1NF Normalization

This document outlines the implementation of the **First Normal Form (1NF)** educational mechanic within the *EduBytes: Samuel* Noir detective game.

## 1. Core Concept
In *EduBytes*, database normalization is presented as a **forensic data recovery** tool. Players do not just "solve a puzzle"; they are reconstructing messy police logs to find hidden investigative leads.

## 2. The 1NF Rule: Atomicity
The game focuses on the first rule of normalization: **Each cell must contain a single, unique (atomic) value.**
*   **The Problem**: Multiple room names (e.g., "Nursery, Living Room") are crammed into a single cell.
*   **The Solution**: The player must split these entries into separate, atomic rows to secure the database integrity.

## 3. Narrative Integration (Chapter 1)

The mechanic is integrated into the story through a "Blocker-Payoff" loop:

1.  **The Blocker (Crime Scene)**:
    Upon investigating the desk at the Crime Scene, Detective Dekoning discovers that the local police logs are "unstructured." He cannot cross-reference the data until it is normalized.
    *   *Triggers: `crime_scene` entry dialogue.*

2.  **The Puzzle (Tablet - Police OS)**:
    The player opens their tablet and interacts with the "Search Log Registry." They must tap the "corrupted" entries to split them according to 1NF rules.
    *   *Mechanism: `normalization_demo/logic.js`*

3.  **The Payoff (Hidden Clue)**:
    Once 1NF is achieved, the database reveals a decrypted entry:
    > **Log #005**: "Nanny's Room Entry Denied. Key missing from Living Room Piano."
    *   *Mechanism: Sets flag `database_normalized`.*

4.  **The Progression (Living Room)**:
    Having "read" the decrypted log, the detective can now find the **Nanny's Key** hidden inside the **Piano** in the Living Room.
    *   *Condition: `GameState.hasFlag('database_normalized')`*

## 4. Technical Details

### Game Flags
*   `database_normalized`: Set when the 1NF puzzle is solved. Unlocks the "Key Found" state for the piano.
*   `has_nannys_key`: Set when the player interacts with the piano after normalization. Unlocks the Nanny's Room door.

### Files Involved
*   `src/normalization_demo/logic.js`: Handles the 1NF splitting logic and sends the success signal.
*   `src/js/components/tablet_widget.js`: Listens for the success signal and updates the `GameState`.
*   `src/js/data/dialogs.js`: Contains the conditional logic for the Piano and the Nanny's Room door.
