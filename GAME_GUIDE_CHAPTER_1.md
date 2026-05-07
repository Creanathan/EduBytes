# NormaLIES: Chapter One — Official Game Guide

Welcome, Detective. This guide will walk you through the core mechanics of the **EduBytes Forensic System** and provide a detailed roadmap to completing **Chapter One: The Gates of Dégrasse Mansion**.

---

## 1. Game Mechanics & Features

### 🔍 Point-and-Click Exploration
Navigate through the Souvellier estate by clicking on interactive objects (hitboxes) and navigation buttons.
- **Side Buttons**: Move between rooms (e.g., Hallway to Living Room).
- **Interactive Objects**: Click on characters, furniture, or clues to trigger dialogue and investigation steps.

### 📁 Inventory System
Found items are stored in your inventory (Briefcase icon).
- **Passive Use**: Some doors or interactions check your inventory automatically (e.g., having the USB stick allows you to start the tablet scan).
- **Active Use**: Specific items (like the Nanny's Key) unlock new rooms.

### 📱 Detective OS (The Forensic Tablet)
Your most powerful tool. It transforms raw, messy data into actionable intelligence.
- **Normalization (1NF)**: You must repair "non-atomic" data (splitting lists into rows) and identify primary keys.
- **Integrity Meter**: Track your progress in real-time. The system won't unlock advanced tools until the data is "Secure."
- **Analysis Engine**: Cross-reference statements to find contradictions (alibi checking).
- **Accusation System**: File your official report once enough evidence is gathered.

---

## 2. Narrative Flow & Dialogue Requirements

To progress, you must speak to the right people at the right time. Here is the logic of the investigation:

### 🤵 Jeanne-Paul Leduc (Butler)
- **Location**: Hallway.
- **Initial Meeting**: He greets you and sends you to the Living Room.
- **Unlocking the Bureau**: After you speak to Thomas about the USB, return to Leduc. He will then provide the "Up" button navigation to the Crime Scene.

### 💼 Thomas Souvellier
- **Location**: Living Room.
- **The Briefing**: He gives you the "Referred to Crime Scene" status. Without this, the Butler won't let you into the Bureau.
- **The USB Clue**: He tells you exactly where to look: the desk in the Crime Scene Bureau.

### 👵 Beatrix Lémur (Nanny)
- **Location**: Nursery.
- **The Alibi**: Initially, she claims she was in the Nursery/Laundry all night.
- **The Confrontation**: This dialogue **only** triggers if:
    1. You have normalized the data in the Tablet.
    2. You have analyzed the "Piano" contradiction.
    3. You have filed an **Accusation** against her in the Tablet.
- **The Key**: During the confrontation, she admits to taking the **Silver Key** and hands it over.

---

## 3. Step-by-Step Walkthrough: Chapter One

### Step 1: Arrival at the Estate
- **The Gates**: Start at the **Outside** scene. Read the narrator's intro and click **Proceed** to enter the grounds.
- **The Butler**: In the **Hallway**, speak to **Jeanne-Paul Leduc**.

### Step 2: Briefing & The Locked Bureau
- **The Partner**: Go left to the **Living Room** and talk to **Thomas Souvellier**.
- **Unlocking the Scene**: Go back to the Hallway and talk to **Leduc** again. Since Thomas gave you permission, Leduc will now unlock the **Crime Scene** (Up button).

### Step 3: Gathering the Evidence
- **The Bureau**: Enter the Crime Scene. Click on the desk in the background to enter the **Crime Scene Bureau** close-up.
- **The USB**: Click on the **USB Stick** on the desk to add it to your inventory.

### Step 4: The Forensic Puzzle (Detective OS)
- **Initialize**: Open your tablet (Briefcase icon -> Tablet). Click **Initialize Scan** to import the USB data.
- **Repair Mode**: The data is corrupted (1NF Integrity Breach).
    - **Atomicity**: Find rows with multiple rooms (e.g., "Kitchen, Hallway"). Click the row and split them into separate entries.
    - **Keys**: Click the **ID** and **Observation Evidence** headers to define the composite primary keys.
- **Validate**: Once the integrity meter hits 100%, advanced tools (Analysis & Report) will unlock in the sidebar.

### Step 5: The Breakthrough
- **Analysis**: Go to the **Analysis (🔗)** tab.
- **The Contradiction**: Filter logs for "Beatrix". You will find that while her alibi says she was in the Nursery, a sensor log (#005) places her at the **Piano**.

### Step 6: Confrontation
- **Accusation**: Go to the **Report (⚖️)** tab in the tablet. Select **Beatrix** and submit your report.
- **The Confrontation**: Go to the **Nursery** (from the Hallway). Speak to **Beatrix Lémur**.
- **The Key**: Take the key from her.

### Step 7: Final Discovery
- **The Nanny's Room**: Return to the **Living Room**. Click the **Middle Door**.
- **Conclusion**: Enter the room and examine her belongings to conclude the chapter.

---

## 4. Quick Completion Checklist (TL;DR)
1.  **Proceed** from Outside.
2.  Talk to **Leduc** (Hallway).
3.  Talk to **Thomas** (Living Room).
4.  Talk to **Leduc** (Hallway) -> Unlock Up button.
5.  Go to **Crime Scene Bureau** -> Take **USB**.
6.  Tablet: **Initialize** -> **Split Rows** -> **Select ID & Observation Headers** -> **Validate**.
7.  Tablet: **Analysis** (Beatrix) -> **Report** (Accuse Beatrix).
8.  Go to **Nursery** -> Talk to **Beatrix** -> **Take Key**.
9.  Go to **Living Room** -> Click **Middle Door** -> **Enter**.
10. Examine **Bed**, **Dresser**, and **Window**.

---

## 🛠 Troubleshooting
- **Stuck on Normalization?** Look at the **Manual (📖)** in the tablet. It will glow if you fail a validation check.
- **Door Won't Open?** Ensure you have both filed the accusation in the tablet **and** talked to Beatrix in the Nursery to physically receive the key.

---
*End of Chapter One*
