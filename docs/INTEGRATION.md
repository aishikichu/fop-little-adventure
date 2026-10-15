# Integration Contract: FOP! — A Little Adventure Through Our Memories

**Version:** 1.0.0  
**Ownership Boundary:**
- **Visual Director & UI Developer (You):** Owns `src/ui/`, `public/assets/`, design system, and visual presentation.
- **Gameplay & Systems Developer (Codex):** Owns gameplay loops, player movement, physics/collision, quest states, inventory/save data, and scene sequencing.

---

## 1. Canonical Characters

| Role | Name / Key | Hair & Features | Reference Identity |
| :--- | :--- | :--- | :--- |
| **PLAYER** | **aishikichu** (`player`) | Lavender-blue bob hair, white beret, navy tie/collar, blue skirt, 3 puffy fox-cloud tails | Right half of reference sheet |
| **COMPANION** | **memma** (`companion`) | Cream-blonde long wavy hair, white beret, navy collar, cream cardigan, **9 fox tails** | Left half of reference sheet |

> [!IMPORTANT]
> **Do not reverse player and companion identities.**  
> **aishikichu** (Player) is the blue-haired fox girl. **memma** (Companion/Recipient) is the yellow/cream-blonde fox girl with nine tails.

### Character Asset Paths

#### In-Game Spritesheets
- **Player Spritesheet (Standard 48×64):** `public/assets/characters/player/player_spritesheet.png`
- **Player Spritesheet (Hi-Res 96×128):** `public/assets/characters/player/player_spritesheet_hi.png`
- **Player Manifest:** `public/assets/characters/player/player_spritesheet.json`
- **Companion Spritesheet (Standard 48×64):** `public/assets/characters/companion/companion_spritesheet.png`
- **Companion Spritesheet (Hi-Res 96×128):** `public/assets/characters/companion/companion_spritesheet_hi.png`
- **Companion Manifest:** `public/assets/characters/companion/companion_spritesheet.json`

#### Animation Mapping
All sheets use 4 columns × 5 rows:

| Row | Animation Name | Frames (Cols) | Frame Rate | Loop | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **0** | `idle_down` | `[0, 2]` | 2 fps | Yes | Facing camera / standing idle |
| **0** | `walk_down` | `[0, 1, 2, 3]` | 6 fps | Yes | Walking down towards camera |
| **1** | `idle_up` | `[0, 2]` | 2 fps | Yes | Facing away / standing idle |
| **1** | `walk_up` | `[0, 1, 2, 3]` | 6 fps | Yes | Walking up away from camera |
| **2** | `idle_left` | `[0, 2]` | 2 fps | Yes | Facing left side idle |
| **2** | `walk_left` | `[0, 1, 2, 3]` | 6 fps | Yes | Walking left |
| **3** | `idle_right` | `[0, 2]` | 2 fps | Yes | Facing right side idle |
| **3** | `walk_right` | `[0, 1, 2, 3]` | 6 fps | Yes | Walking right |
| **4** | `wave` | `[0, 1]` | 4 fps | Yes | Waving greeting / friendly wave |
| **4** | `jump` | `[2]` | 1 fps | No | Jumping airborne frame |
| **4** | `sit` | `[3]` | 1 fps | No | Sitting down peacefully |

#### Dialogue Portraits & Emotes (128×128 Centered PNGs)
- **Player:**
  - `public/assets/characters/player/portraits/neutral.png`
  - `public/assets/characters/player/portraits/wink.png`
  - `public/assets/characters/player/portraits/curious.png`
  - `public/assets/characters/player/portraits/love.png`
  - `public/assets/characters/player/portraits/shy.png`
- **Companion:**
  - `public/assets/characters/companion/portraits/neutral.png`
  - `public/assets/characters/companion/portraits/wink.png`
  - `public/assets/characters/companion/portraits/curious.png`
  - `public/assets/characters/companion/portraits/love.png`
  - `public/assets/characters/companion/portraits/shy.png`

---

## 2. Scenery & Tileset Catalog

Base tile grid: **16×16 px** (Objects fit 16×16, 32×32, 48×48, 64×64).

### Sprout Lands Core Tilesets (`public/assets/tilesets/sprout_lands/`)
*Created by Cup Nooble — licensed for non-commercial game use with attribution.*
- `grass.png` (176×112)
- `hills.png` (176×144)
- `water.png` (64×16 animated tiles)
- `paths.png` (dirt / stone / gravel paths)
- `fences.png` (wooden fences, gates)
- `wooden_house.png` (house walls, roofs, chimneys)
- `doors.png` (animated opening/closing doors)
- `basic_furniture.png` (chairs, tables, rugs, lamps)
- `basic_plants.png` (sprouts, crops, flowers)
- `grass_biom_props.png` (trees, logs, rocks, mushrooms)
- `wood_bridge.png` (pond/river bridges)
- `chest.png` (animated opening treasure chest)

### Chapter Scenery Packs

#### 1. Moonlit EN-JP Meeting Area (`public/assets/tilesets/moonlit_meeting/`)
- `torii_gate.png` (64×64 vermilion Japanese shrine arch)
- `stone_lantern.png` (32×32 glowing Toro stone lantern)
- `hanging_lantern.png` (16×32 swaying festival paper lantern)
- `cherry_blossom_tree.png` (64×64 pastel pink moonlit sakura tree)

#### 2. Suspicious Pocket System Merchant Stall (`public/assets/tilesets/merchant_stall/`)
- `merchant_stall.png` (64×64 wooden cart with lavender & cream awning)
- `merchant_npc.png` (32×48 mysterious hooded merchant with glowing eyes & fox tail)

#### 3. Frog Forest & Pond (`public/assets/tilesets/frog_forest/`)
- `frog_spritesheet.png` (128×32: 4 frames of 32×32 cute frog — Idle, Blink, Croak, Hop)
- `lilypads.png` (32×32 water lily pads with pink/white lotus)
- `glowing_mushrooms.png` (32×32 cyan & lavender bioluminescent fungi)

#### 4. Cozy Memory Room (`public/assets/tilesets/memory_room/`)
- `fireplace.png` (144×48: 3 frames of 48×48 stone fireplace with animated hearth fire)
- `bookshelf.png` (32×48 wooden shelf with memory tomes)
- `cozy_rug.png` (64×40 plush pastel oval rug)
- `memory_frames.png` (32×24 golden framed nostalgic memory portrait)

#### 5. Moonlit Confession Garden (`public/assets/tilesets/confession_garden/`)
- `garden_arch.png` (48×64 romantic floral wisteria archway)
- `moon_fountain.png` (48×48 stone water fountain reflecting the moon)
- `stone_bench.png` (48×24 romantic bench)
- `glowing_flowers.png` (32×16 luminescent blossoms)

#### 6. Final Constellation Sky (`public/assets/tilesets/constellation_sky/`)
- `sky_background.png` (320×240 seamless midnight navy starfield)
- `constellations.png` (160×120 starry constellation pattern of fox & hearts)

---

## 3. Collectibles & Gameplay Props (`public/assets/items/`)

- `memory_star.png` (128×32: 4 animated frames of 32×32 spinning glowing Memory Star)
- `quest_indicators.png` (80×16: 5 overhead badges of 16×16 — Exclamation `!`, Question `?`, Heart `♡`, Star, Dots `...`)
- `memory_token.png` (24×24 engraved bronze/gold coin)

---

## 4. UI System & Event Bus (`src/ui/`)

The UI system exports a singleton or modular controller in `src/ui/index.js` that listens to `window.GameEvents` (or calls through `UIController`).

### UI Event Contract

```javascript
import { UIController } from './src/ui/index.js';

// 1. Dialogue System
window.GameEvents.emit('dialogue:show', {
  speaker: 'Companion',           // 'Player' | 'Companion' | 'Merchant' | string
  portrait: 'neutral',           // 'neutral' | 'wink' | 'curious' | 'love' | 'shy'
  character: 'companion',        // 'player' | 'companion' | 'merchant'
  text: 'I still remember the first night we met beneath the lanterns...',
  choices: [                     // Optional interactive response choices
    { text: 'I remember every moment.', nextId: 'resp_1' },
    { text: 'Look at how bright the moon is tonight!', nextId: 'resp_2' }
  ],
  onChoice: (choiceIndex, choice) => { /* Codex handles logic */ },
  onComplete: () => { /* Dialogue ended */ }
});

// Close dialogue programmatically
window.GameEvents.emit('dialogue:close');

// 2. Quest & Objective Tracker
window.GameEvents.emit('quest:set', {
  title: 'Memory of Meeting',
  objective: 'Find the 3 Memory Stars scattered by the pond',
  progress: 1,
  total: 3
});

// 3. Memory Star Counter
window.GameEvents.emit('star:add', { count: 1, totalStars: 5 });

// 4. Chapter / Area Transition Banner
window.GameEvents.emit('chapter:transition', {
  chapterNumber: 1,
  title: 'The Meeting by the Torii Gate',
  subtitle: 'Chapter I: Where Our Stories Entwined'
});

// 5. Ending Screen
window.GameEvents.emit('ending:show', {
  memoriesFound: 5,
  totalMemories: 5,
  confessionLetter: 'From the quiet paths to the starry sky, thank you for walking beside me.',
  onRestart: () => { /* Restart game */ }
});

// 6. Mobile / Keyboard Input Events (From UI to Gameplay)
window.GameEvents.on('input:move', ({ x, y }) => {
  // x: -1 (left), 1 (right), 0
  // y: -1 (up), 1 (down), 0
});

window.GameEvents.on('input:action', ({ button }) => {
  // button: 'A' (Interact / Confirm) | 'B' (Run / Cancel)
});

// 7. Pause & Audio
window.GameEvents.on('game:pause', () => { /* Codex pauses loop */ });
window.GameEvents.on('game:resume', () => { /* Codex resumes loop */ });
window.GameEvents.on('audio:volume', ({ bgm, sfx, mute }) => { /* Audio levels */ });
```

---

## 5. Creator Attribution

In all credits and in-game pause/about menus:
- **Tilesets & Base Sprites:** *Sprout Lands Asset Pack* by **Cup Nooble** ([cupnooble.itch.io/sprout-lands-asset-pack](https://cupnooble.itch.io/sprout-lands-asset-pack))
- **Character Design & Pixel Art:** Canonical Chibi Pixel characters as provided.

## 6. Implemented engine contract — Codex integration addendum

The working engine is Phaser scene `Adventure`, with data chapter IDs `enjp`, `hello`, `pocket`, `fop`, `room`, `garden`. Internal viewport 400×225; world 640×360. Story, opening, ending, quests, object coordinates and optional audio paths live in `src/data/story.js`. Exactly five stars: hello, pocket, fop, room, garden. The prologue starts the first-star quest. No response to the confession is invented.

Character sheets above are now loaded at 48×64 and rendered at 2/3 scale, with independent 12×8 foot bodies. Registered animation keys are prefixed: `player-idle_down`, `player-walk_up`, `companion-walk_left`, etc., and `player-sit` / `companion-sit`. Scenery keys currently used: sakura, torii, stall, merchant, bookshelf, bench, flower, arch, fountain, frog, star. File paths come from the centralized assets array. Engineering never modifies visual files. Sprout Lands license is present in public/assets/tilesets/sprout_lands/SPROUT_LANDS_LICENSE.txt.

`src/game/designerBridge.js` implements the proposed `window.GameEvents.on/emit` bus. The dialogue `onComplete` callback means the user has dismissed the entire page, not merely that typewriting has finished. `star:add.count` is the absolute collected-star count (idempotent), and `totalStars` is capacity 5. Chapter banners fire only when the chapter changes. `audio:volume` currently supports mute; separate BGM/SFX gain is reserved for later recordings. Current placeholders use subtitles and quiet synthesized tones.

The complete interface is also available as `window.fop.subscribe(listener) => unsubscribe`, `getState()`, and `dispatch(action,payload)`. Events: state ({chapter,title,subtitle,quest,stars,completed,sound}); dialogue ({speaker,text,fullText,pageId,typing}); dialogue-close; menu ({canResume,canReplay}); menu-close; ending ({text}); ending-close; subtitle ({text}); prompt ({text}); minigame ({sequence,index,feedback}); minigame-close. `dispatch('sync')` refreshes the HUD and initial menu after a UI subscribes.

Callbacks: start, resume, restart, replay, advance, interact, sound, menu, close-menu; fop with payload 0/1/2; move with {direction:'up'|'down'|'left'|'right',down:boolean}. UI must confirm before restart. Clear pointer directions on pointerup, cancel, lost capture and blur. Space activates focused HTML buttons; E remains available. Dialogue/menu/minigame/ending block walking. Every required UI control must be keyboard reachable and at least 44px on touchscreens.

Until the full src/ui/index.js presentation is ready, src/game/fallbackUI.js supplies all required menus, dialogue, minigame buttons and mobile controls. Set window.FOP_CUSTOM_UI=true before main.js to disable it; a replacement must implement the full menu and minigame callback set above in addition to the proposed events. The fallback is engineering-owned; no src/ui files are overwritten.

Saving: versioned localStorage key fop-save-v1; chapter index, unique stars, inspected objects, completed and sound. Saves after interactions and transitions. Storage failure is non-blocking. Restart clears progression through a fresh save; replay is available only after completion. Read-only window.fop.inspect() supports browser verification without a progression bypass.

### Designer UI activation checklist
The delivered UIController files are preserved but not enabled by main.js. Before replacing the working fallback, connect its game:start, game:restart, chapter:restart and game:exit_to_menu actions to the complete dispatch callbacks above; add resume/replay and the three-input FOP controls; keep opening/ending narrative sourced from story.js; and resolve `/assets/...` URLs through Vite BASE_URL for GitHub repository Pages. Coordinate ownership of dialogue keyboard/typewriter input so a Space press cannot advance twice. The active fallback already covers these flows. This is a presentation handoff, not a gameplay progression blocker.

---

## 7. Designer UI Integration & Verification Status (Completed)

As of 2026-10-15, the Designer UI has been integrated, elevated, and fully verified against Codex's engine:

1. **Activated in `src/main.js`:**
   - `src/ui/GameUI.js` implements `installDesignerUI()`, replacing the raw fallback UI while preserving all Playwright-targeted element IDs and accessibility attributes (`#start`, `#resume`, `#replay`, `#restart`, `#menuButton`, `#advance`, `#sound`, `#dialogue`, `#minigame`, `[data-fop]`, `[data-dir]`, `#ending`).
   - `src/ui/styles/gameUI.css` provides the custom color tokens, glassmorphism panels, pixel typography, and touch D-pad.
   - `src/ui/VFXManager.js` renders ambient starfield / firefly canvas particles.
   - `src/ui/SoundFX.js` provides synthesized Web Audio voice blips and chimes.

2. **Narrative & Asset Path Resolution:**
   - Approved Draft 3 story text from `src/data/story.js` is rendered across all dialogue, opening greeting, and ending letter.
   - All asset references resolve cleanly via `import.meta.env.BASE_URL` (`${base}assets/...`).
   - Dynamic 128×128 pixel portraits (`player` and `companion` with `neutral`, `wink`, `curious`, `love`, `shy` expressions) update dynamically in the dialogue box.

3. **Automated Verification:**
   - `node --test tests/*.test.js` passes 3/3 progression and storage unit tests.
   - `playwright test` passes all end-to-end browser tests (both full 6-chapter journey and mobile touch controls).
   - Production build `npm run build` succeeds cleanly without errors.

