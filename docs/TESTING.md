# Engineering validation

Run `npm test`, `npm run build`, then `npm run test:e2e`.

The browser suite serves the actual production build in Microsoft Edge. It walks through the world with keyboard input and clicks the game controls; it does not teleport, inject stars, or modify saves to reach the ending. `window.fop.inspect()` returns cloned state for assertions.

Coverage: all six chapters, five unique stars, three pocket items, frog mistake/retry/success, four room memories, Garden bench and ending; page errors and console errors; reload/resume, ending replay and confirmed restart; 390 × 844 touch-device layout, held direction input/release, dialogue completion, mute, solid obstacle collision and horizontal overflow. Unit tests cover awards, chapter gates, corrupt/unavailable storage and round-trip saves.

Screenshots: `test-results/ending-desktop.png` and `test-results/mobile.png` (disposable verification artifacts).

Human checks still needed: real iOS Safari and Android devices, final designer UI, recorded voice levels, personal accuracy of dialogue, and 10–15-minute reading/exploration pace. Automated tests skip text and cannot validate emotional pacing. Phaser produces a large-chunk build advisory (~351 kB gzip JavaScript).

Latest verified result (2026-10-15): 3 unit tests passed; production build passed; 2 Edge browser tests passed against the artwork-integrated build, including the complete five-star journey with an empty browser-error list. Desktop ending and mobile screenshots were visually inspected. Final designer UI modules are preserved but are not the active presentation. Deployment has not been performed because no target repository was supplied.
