# FOP! — project and story review

Inspection date: 2026-10-15. This review adds documentation, an unconnected story draft and review scripts. It does not change gameplay, live dialogue, source HTML, visual assets or the current production build.

## Important: there are two presentations

The running `http://localhost:4173/` response was inspected. It serves `dist/index.html`, which loads the complete Phaser game and its fallback interface. The previously verified five-star adventure is still there.

The **source** root `index.html` currently contains a separate canvas visual-director showcase. It imports `src/ui/index.js`, not `src/main.js`. Its dock manually triggers dialogue, stars, scenery and an ending. It is not the same complete adventure: it does not connect the Pocket/FOP puzzles, chapter gates or localStorage progression. The source showcase and saved production build have diverged. A normal build now would replace the current production entry with that showcase. This review intentionally did not rebuild or overwrite either version.

Before the next gameplay build, reconcile these entry points incrementally: retain the showcase at a separate page, restore a dedicated Phaser entry, then connect designer UI components one at a time with end-to-end checks. That is a proposed follow-up, not a change made during this review.

## The playable journey, beginning to end

| Order | Area | What the player does | Unlock / star |
|---|---|---|---|
| 0 | Opening | Reads the original gift message; starts or resumes | No star |
| 1 | EN-JP prologue | Meets the cream-haired fox; optionally reads sign and portal memories | Companion begins following; exit opens |
| 2 | The First Hello | Explores two optional memory markers, interacts with the first light | Star 1; next exit opens |
| 3 | Suspicious Pocket System | Inspects emergency spoon, bottled scream and pocket-within-a-pocket; merchant is optional | Star 2 after all three items |
| 4 | Everybody FOP | Starts choir; presses FOP, FOPS, EVERYBODY FOP in order | Star 3; unlimited retries, no timer |
| 5 | A Thousand Little Moments | Visits chat, voice call, music and keepsake; hidden cushion joke is optional | Star 4 after the four main objects |
| 6 | The Garden | Collects final light, then interacts with bench | Star 5; bench requires all five |
| 7 | Ending | Both characters sit; constellation rises; original final letter appears | Completed save; ending replay unlocked |

Movement is WASD/arrows or an on-screen direction pad. E/Space or the star button interacts with nearby objects. Dialogue first reveals the line, then advances. The camera follows the player. A breadcrumb trail guides the companion around the same collision obstacles. Exits fade between chapters. There is no combat or timed failure. Saves contain chapter, collected stars, visited objects, completion and mute preference; character coordinates are not saved, so resume starts at that chapter's entrance. Audio recordings are absent: text subtitles and short synthesized tones are used. Restart requires confirmation in the working UI.

This is a complete prototype path, not a claim that a human 10–15-minute pacing pass or real-phone testing has been completed.

## What the current dialogue says

Read **STORY-CURRENT.md** for every current interaction page, puzzle result and the full opening/ending, in chronological order.

The opening and ending were supplied in the original brief. The named jokes EN-JP, Suspicious Pocket System, FOP/fops/everybody fop, abwaa, the scream and the garden confession also came from that brief. Other connective prose was written for the prototype: awkward opening lines, soup emergencies, nested-pocket receipts, honorary frog status, chat/call/song/keepsake reflections and the cushion gag. These are **not verified personal memories or quotations**.

The live engine mostly labels dialogue “a little memory”; the bench sequence is labeled “you”. It does not yet have a fully authored alternating two-character conversation. The proposed draft supplies speaker labels for review without claiming that she said anything.

The separate source showcase contains additional sample promises and “garden of our vows” language. That is unapproved demo text and is excluded from the personalization draft. Its ending component also has a separate fallback letter. Those strings are why the whole project cannot yet be described as using one universal narrative source.

## Files and responsibilities

| File / directory | Controls |
|---|---|
| `src/main.js` | Phaser setup, 400×225 viewport, pixel rendering, working fallback UI |
| `src/game/Adventure.js` | All six data-driven chapters within one Phaser scene; movement/collisions, following, camera, dialogue typewriter, interactions, puzzles, star awards, scene fades, audio fallback, sitting/constellation |
| `src/game/progress.js` | Five star IDs, chapter gates, save validation, localStorage reads/writes |
| `src/game/bridge.js` | `window.fop` state/events/actions |
| `src/game/designerBridge.js` | Partial adapter to Antigravity's `window.GameEvents` UI contract |
| `src/game/fallbackUI.js`, `fallback.css` | Active production menus, HUD, dialogue panel, puzzle buttons, touch controls, ending presentation; some UI headings remain here |
| `src/data/story.js` | Current live narrative plus asset/audio declarations, chapter/object layout, quests and obstacles; compact and technical |
| `src/data/story.draft.js` | NEW chronological, commented personalization file; text and speaker/setting notes only; **not imported or activated** |
| `src/ui/` | Designer menu/dialogue/portraits, HUD, pause controls, ending, mobile controls, sound synthesis and ambient VFX; used by source showcase, not active Phaser fallback |
| `index.html` | Current source visual-showcase entry and demo-specific text/render loop |
| `public/assets/` | Runtime-ready character atlases, crops, portraits, scenery, UI and copied Sprout Lands sheets |
| `references/` | Original character reference, original pack/archive, license and palette/bitmask aids; no direct runtime imports |
| `vite.config.js`, `package.json` | Vite commands, dependencies and relative deployment base |
| `.github/workflows/deploy.yml` | GitHub Pages build/deploy workflow; entry-point mismatch must be reconciled before using it |
| `tests/` | Save/progression unit checks and full Phaser journey/mobile browser checks |
| `docs/INTEGRATION.md` | Shared interface/ownership agreement; includes previous designer-UI integration caveats |

## Visual findings

Read **ASSET-AUDIT.md** for all 130 files and exact use status. `asset-review/inventory.csv` and `.json` include dimensions, file sizes and SHA-256 hashes. Contact sheets show the original references, character variants and scenery/UI assets.

- Both playable characters use the supplied processed reference artwork. Lavender remains the creator/player, cream remains the companion. The original reference image's labels are not used to swap those roles.
- Standard 48×64 atlas frames provide four-direction idle/walk and sitting. Wave/jump poses, higher-resolution atlases, raw pose crops and portrait expressions exist but are not used by the active Phaser presentation.
- Thirteen asset keys are actually rendered: player, companion, sakura, torii, merchant, stall, bookshelf, bench, flower, arch, fountain, frog and star. Lantern, rug and sky are preloaded but not drawn. Frogs and stars currently use frame zero; stars bob but do not cycle their four spin frames.
- No file under `references/` is loaded directly. The character sheet is used indirectly through processed character atlases. Sprout Lands sheets were copied into `public/assets/tilesets/sprout_lands/`, but the playable game's terrain is still programmatic geometry. “Copied into the build” is different from “shown on screen”.
- Several existing images can replace remaining generic scenery and props without drawing new artwork. Terrain needs tile selection/layout and collision mapping. Portraits need UI integration. Original reference art needs extraction because it includes background, labels and irregularly arranged poses; those processed derivatives already exist.
- The pack's generic farmer sprites are intentionally unsuitable replacements for your fox girls. Farm tools/animals/crops have no current story need. Palettes, bitmask references and archives are authoring resources rather than scenery.
- There are no 3D character models or skeletal-animation files in these folders. All character assets are 2D images and frame manifests.

No visual asset has been replaced, recolored, redrawn or deleted during this review.

## How to personalize safely

1. Open `src/data/story.draft.js`, or read the complete rendered draft in `STORY-DRAFT.md`.
2. Edit only prose, names and labels. Replace `[OUR INSIDE JOKE]`, `[A MEMORY WE SHARE]`, `[SOMETHING SHE ALWAYS SAYS]` and other bracketed prompts, or remove optional lines. Keep IDs unchanged.
3. The original opening/ending remain available in the draft for you to edit. Scene descriptions are authoring notes. New transition/star labels are proposals, not silent changes to gameplay.
4. Approve the complete wording before it is mapped into the live game. The approval requirement comes from your current request to review major story changes first.
5. After approval, wire the text into the existing mechanics and centralize remaining narrative-bearing UI strings. Do not change star IDs, puzzle rules or save format just to personalize dialogue.

Validation during this review: the draft module parses; all six scene IDs and 21 interaction IDs match the working story; all 16 declared runtime assets exist. Image inventory checks compare the original files with the files remaining after the review. No production rebuild was performed, because that would replace the preserved Phaser entry with the separate source showcase.
