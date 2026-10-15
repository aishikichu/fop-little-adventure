# FOP! — A Little Adventure Through Our Memories

A tiny Phaser 3 adventure for one year of memories. Lavender is the player; cream is the companion. Original engineering placeholders are deliberately isolated from Antigravity's art and UI folders.

## Run
Node 22+ recommended. `npm ci`, then `npm run dev`. `npm test` checks progression and save recovery. `npm run build` produces `dist/`; `npm run preview` serves that production build. `npm run test:e2e` uses installed Microsoft Edge; for other platforms change the Playwright channel or install Chromium and omit channel.

## Play
WASD / arrows to move; E / Space to interact. Click Continue to reveal or advance text. Touch direction pad and star button are always available. Three pocket items unlock one star; the frog choir is untimed and highlights the next call; four room memories unlock another. Collect the Garden star and sit at the bench. Progress saves after interactions. Menu offers resume, restart (with confirmation), and ending replay.

## Edit / integrate
All narrative and optional audio paths: `src/data/story.js`. All gameplay: `src/game/`. Read `docs/INTEGRATION.md` before adding visuals or a replacement UI. `src/ui/` and `public/assets/` are reserved for Antigravity. Reference artwork is under `references/`. The current build integrates the supplied character sheets, directional/sitting animations and selected scenery, with generated geometry for the remaining world. The full designer UI remains a separate handoff; the working fallback interface is in `src/game/`. Never rely on filenames that are absent from assets.

## Deploy
Commit this project to a GitHub repository on `main`, enable Settings → Pages → GitHub Actions, and run the included workflow. Vite's relative base supports repository subpaths. Only `dist/` is published; private reference material is not copied into it. No repository or hosting destination was supplied, so no external deployment is performed by local setup.

## Scope
All dialogue is editable placeholder writing based on the brief, not a claim about exact real conversations. No response to the garden confession is invented. Reading and exploration determine playtime; a human pacing pass is needed for the 10–15-minute target. Audio recordings and final UI polish remain handoffs; missing recordings use subtitles and synthesized tones.

Assets bundled with this project include Sprout Lands by Cup Nooble. Its non-commercial license and attribution terms are preserved in `public/assets/tilesets/sprout_lands/SPROUT_LANDS_LICENSE.txt`. Character reference supplied by the creator; processed sprites and scenery supplied by Antigravity.
