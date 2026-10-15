# Asset audit

The folder is named **references/** (plural), not reference/. All 130 files under references/ and public/assets/ were inventoried; every raster image was included in a contact sheet. PNGs and the GIF first frame were visually reviewed. The ZIP and Aseprite palette were inventoried, not treated as runtime images. No 3D model/rig/animation files are present.

## What the playable Phaser build uses

| Key | Runtime path | Use |
|---|---|---|
| player | assets/characters/player/player_spritesheet.png | Directional idle/walk and sitting; wave/jump unused |
| companion | assets/characters/companion/companion_spritesheet.png | Directional idle/walk and sitting; wave/jump unused |
| sakura | assets/tilesets/moonlit_meeting/cherry_blossom_tree.png | Drawn in relevant chapters |
| lantern | assets/tilesets/moonlit_meeting/stone_lantern.png | Preloaded, but never drawn |
| torii | assets/tilesets/moonlit_meeting/torii_gate.png | Drawn in relevant chapters |
| merchant | assets/tilesets/merchant_stall/merchant_npc.png | Drawn in relevant chapters |
| stall | assets/tilesets/merchant_stall/merchant_stall.png | Drawn in relevant chapters |
| bookshelf | assets/tilesets/memory_room/bookshelf.png | Drawn in relevant chapters |
| rug | assets/tilesets/memory_room/cozy_rug.png | Preloaded, but never drawn |
| bench | assets/tilesets/confession_garden/stone_bench.png | Drawn in relevant chapters |
| flower | assets/tilesets/confession_garden/glowing_flowers.png | Drawn in relevant chapters |
| arch | assets/tilesets/confession_garden/garden_arch.png | Drawn in relevant chapters |
| fountain | assets/tilesets/confession_garden/moon_fountain.png | Drawn in relevant chapters |
| sky | assets/tilesets/constellation_sky/sky_background.png | Preloaded, but never drawn |
| frog | assets/tilesets/frog_forest/frog_spritesheet.png | Frame 0 only; croak/hop animation unused |
| star | assets/items/memory_star.png | Frame 0, bobbing tween; spin frames unused |

The Phaser floor, paths, portals, lights, constellation and several interaction props are still programmatic geometry. It does not render the Sprout Lands terrain sheets. The current source-index showcase is different: it draws additional lantern/pond/room/constellation assets; its three Sprout Lands entries are loaded but never drawn. The designer UI uses portraits and some UI images, whereas the active Phaser fallback UI does not.

## Every file

“Unused” means not used by the active Phaser renderer, not unusable or recommended for deletion. Exact source-copy matches are based on SHA-256, not filenames. Derived character sprites are visually consistent with the original reference but are processed crops/atlases, not byte-identical originals.

| File | Dimensions | Active Phaser status | Source / other use |
|---|---|---|---|
| references/public/asset/Chibi Pixel Character Sprite Sheet.png | 1536 × 1024 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack.zip | — | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/read_me.txt | — | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Characters/Basic Charakter Actions.png | 96 × 576 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Characters/Basic Charakter Spritesheet.png | 192 × 192 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Characters/Egg_And_Nest.png | 64 × 16 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Characters/Free Chicken Sprites.png | 64 × 32 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Characters/Free Cow Sprites.png | 96 × 64 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Characters/Tools.png | 96 × 96 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Basic Furniture.png | 144 × 96 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Basic Grass Biom things 1.png | 144 × 80 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Basic Plants.png | 96 × 32 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Basic tools and meterials.png | 48 × 32 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Basic_Furniture.png | 144 × 96 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Basic_Grass_Biom_things.png | 144 × 80 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Basic_Plants.png | 96 × 32 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Basic_tools_and_meterials.png | 48 × 32 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Chest.png | 240 × 96 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Egg item.png | 16 × 16 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Egg_item.png | 16 × 16 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Free_Chicken_House.png | 48 × 48 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Paths.png | 64 × 64 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Simple Milk and grass item.png | 64 × 16 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Simple_Milk_and_grass_item.png | 64 × 16 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Wood Bridge.png | 80 × 48 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Wood_Bridge.png | 80 × 48 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Sprout Lands color pallet/Sprout Lands defautlt palette snip.PNG | 236 × 371 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Sprout Lands color pallet/Sprout Lands defautlt palette.aseprite | — | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Sprout Lands color pallet/Sprout Lands defautlt palette.png | 16 × 7 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Tilesets/Bitmask references 1.png | 480 × 256 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Tilesets/Bitmask references 2.png | 480 × 256 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Tilesets/Bitmask references gif.gif | 540 × 540 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Tilesets/Doors.png | 16 × 64 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Tilesets/Fences.png | 64 × 64 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Tilesets/Grass.png | 176 × 112 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Tilesets/Hills.png | 176 × 144 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Tilesets/Tilled Dirt.png | 128 × 128 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Tilesets/Tilled_Dirt_v2.png | 176 × 112 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Tilesets/Tilled_Dirt_Wide_v2.png | 176 × 112 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Tilesets/Tilled_Dirt_Wide.png | 176 × 112 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Tilesets/Tilled_Dirt.png | 176 × 112 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Tilesets/Water.png | 64 × 16 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Tilesets/Wooden House.png | 112 × 80 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Tilesets/Wooden_House_Roof_Tilset.png | 112 × 80 | Not loaded | Original reference retained unchanged |
| references/public/asset/Sprout Lands - Sprites - Basic pack/Tilesets/Wooden_House_Walls_Tilset.png | 80 × 48 | Not loaded | Original reference retained unchanged |
| public/assets/characters/companion/companion_spritesheet_hi.json | — | Not loaded | Processed character art / manifest |
| public/assets/characters/companion/companion_spritesheet_hi.png | 384 × 640 | Not loaded | Processed character art / manifest |
| public/assets/characters/companion/companion_spritesheet.json | — | Not loaded | Processed character art / manifest |
| public/assets/characters/companion/companion_spritesheet.png | 192 × 320 | Rendered | Processed character art / manifest; named in source showcase |
| public/assets/characters/companion/portraits/curious_raw.png | 123 × 130 | Not loaded | Processed character art / manifest |
| public/assets/characters/companion/portraits/curious.png | 128 × 128 | Not loaded | Processed character art / manifest |
| public/assets/characters/companion/portraits/love_raw.png | 113 × 128 | Not loaded | Processed character art / manifest |
| public/assets/characters/companion/portraits/love.png | 128 × 128 | Not loaded | Processed character art / manifest |
| public/assets/characters/companion/portraits/neutral_raw.png | 110 × 132 | Not loaded | Processed character art / manifest |
| public/assets/characters/companion/portraits/neutral.png | 128 × 128 | Not loaded | Processed character art / manifest |
| public/assets/characters/companion/portraits/shy_raw.png | 114 × 133 | Not loaded | Processed character art / manifest |
| public/assets/characters/companion/portraits/shy.png | 128 × 128 | Not loaded | Processed character art / manifest |
| public/assets/characters/companion/portraits/wink_raw.png | 113 × 132 | Not loaded | Processed character art / manifest |
| public/assets/characters/companion/portraits/wink.png | 128 × 128 | Not loaded | Processed character art / manifest |
| public/assets/characters/companion/poses/action_idle.png | 98 × 144 | Not loaded | Processed character art / manifest |
| public/assets/characters/companion/poses/action_jump.png | 109 × 157 | Not loaded | Processed character art / manifest |
| public/assets/characters/companion/poses/action_sit.png | 108 × 122 | Not loaded | Processed character art / manifest |
| public/assets/characters/companion/poses/action_walk.png | 94 × 146 | Not loaded | Processed character art / manifest |
| public/assets/characters/companion/poses/action_wave.png | 115 × 148 | Not loaded | Processed character art / manifest |
| public/assets/characters/companion/poses/turn_back.png | 182 × 303 | Not loaded | Processed character art / manifest |
| public/assets/characters/companion/poses/turn_front.png | 185 × 304 | Not loaded | Processed character art / manifest |
| public/assets/characters/companion/poses/turn_side.png | 146 × 304 | Not loaded | Processed character art / manifest |
| public/assets/characters/player/player_spritesheet_hi.json | — | Not loaded | Processed character art / manifest |
| public/assets/characters/player/player_spritesheet_hi.png | 384 × 640 | Not loaded | Processed character art / manifest |
| public/assets/characters/player/player_spritesheet.json | — | Not loaded | Processed character art / manifest |
| public/assets/characters/player/player_spritesheet.png | 192 × 320 | Rendered | Processed character art / manifest; named in source showcase |
| public/assets/characters/player/portraits/curious_raw.png | 121 × 128 | Not loaded | Processed character art / manifest |
| public/assets/characters/player/portraits/curious.png | 128 × 128 | Not loaded | Processed character art / manifest |
| public/assets/characters/player/portraits/love_raw.png | 118 × 127 | Not loaded | Processed character art / manifest |
| public/assets/characters/player/portraits/love.png | 128 × 128 | Not loaded | Processed character art / manifest |
| public/assets/characters/player/portraits/neutral_raw.png | 120 × 131 | Not loaded | Processed character art / manifest |
| public/assets/characters/player/portraits/neutral.png | 128 × 128 | Not loaded | Processed character art / manifest |
| public/assets/characters/player/portraits/shy_raw.png | 124 × 127 | Not loaded | Processed character art / manifest |
| public/assets/characters/player/portraits/shy.png | 128 × 128 | Not loaded | Processed character art / manifest |
| public/assets/characters/player/portraits/wink_raw.png | 123 × 128 | Not loaded | Processed character art / manifest |
| public/assets/characters/player/portraits/wink.png | 128 × 128 | Not loaded | Processed character art / manifest |
| public/assets/characters/player/poses/action_idle.png | 95 × 144 | Not loaded | Processed character art / manifest |
| public/assets/characters/player/poses/action_jump.png | 100 × 160 | Not loaded | Processed character art / manifest |
| public/assets/characters/player/poses/action_sit.png | 109 × 127 | Not loaded | Processed character art / manifest |
| public/assets/characters/player/poses/action_walk.png | 95 × 144 | Not loaded | Processed character art / manifest |
| public/assets/characters/player/poses/action_wave.png | 105 × 145 | Not loaded | Processed character art / manifest |
| public/assets/characters/player/poses/turn_back.png | 156 × 300 | Not loaded | Processed character art / manifest |
| public/assets/characters/player/poses/turn_front.png | 161 × 304 | Not loaded | Processed character art / manifest |
| public/assets/characters/player/poses/turn_side.png | 139 × 304 | Not loaded | Processed character art / manifest |
| public/assets/items/memory_star.png | 128 × 32 | Rendered | Designer-supplied project asset; named in source showcase |
| public/assets/items/memory_token.png | 24 × 24 | Not loaded | Designer-supplied project asset |
| public/assets/items/quest_indicators.png | 80 × 16 | Not loaded | Designer-supplied project asset |
| public/assets/tilesets/confession_garden/garden_arch.png | 48 × 64 | Rendered | Designer-supplied project asset; named in source showcase |
| public/assets/tilesets/confession_garden/glowing_flowers.png | 32 × 16 | Rendered | Designer-supplied project asset; named in source showcase |
| public/assets/tilesets/confession_garden/moon_fountain.png | 48 × 48 | Rendered | Designer-supplied project asset; named in source showcase |
| public/assets/tilesets/confession_garden/stone_bench.png | 48 × 24 | Rendered | Designer-supplied project asset; named in source showcase |
| public/assets/tilesets/constellation_sky/constellations.png | 160 × 120 | Not loaded | Designer-supplied project asset; named in source showcase |
| public/assets/tilesets/constellation_sky/sky_background.png | 320 × 240 | Loaded, not drawn | Designer-supplied project asset |
| public/assets/tilesets/frog_forest/frog_spritesheet.png | 128 × 32 | Rendered | Designer-supplied project asset; named in source showcase |
| public/assets/tilesets/frog_forest/glowing_mushrooms.png | 32 × 32 | Not loaded | Designer-supplied project asset; named in source showcase |
| public/assets/tilesets/frog_forest/lilypads.png | 32 × 32 | Not loaded | Designer-supplied project asset; named in source showcase |
| public/assets/tilesets/memory_room/bookshelf.png | 32 × 48 | Rendered | Designer-supplied project asset; named in source showcase |
| public/assets/tilesets/memory_room/cozy_rug.png | 64 × 40 | Loaded, not drawn | Designer-supplied project asset; named in source showcase |
| public/assets/tilesets/memory_room/fireplace.png | 144 × 48 | Not loaded | Designer-supplied project asset; named in source showcase |
| public/assets/tilesets/memory_room/memory_frames.png | 32 × 24 | Not loaded | Designer-supplied project asset; named in source showcase |
| public/assets/tilesets/merchant_stall/merchant_npc.png | 32 × 48 | Rendered | Designer-supplied project asset; named in source showcase |
| public/assets/tilesets/merchant_stall/merchant_stall.png | 64 × 64 | Rendered | Designer-supplied project asset; named in source showcase |
| public/assets/tilesets/moonlit_meeting/cherry_blossom_tree.png | 64 × 64 | Rendered | Designer-supplied project asset; named in source showcase |
| public/assets/tilesets/moonlit_meeting/hanging_lantern.png | 16 × 32 | Not loaded | Designer-supplied project asset |
| public/assets/tilesets/moonlit_meeting/stone_lantern.png | 32 × 32 | Loaded, not drawn | Designer-supplied project asset; named in source showcase |
| public/assets/tilesets/moonlit_meeting/torii_gate.png | 64 × 64 | Rendered | Designer-supplied project asset; named in source showcase |
| public/assets/tilesets/sprout_lands/basic_furniture.png | 144 × 96 | Not loaded | Exact copy of references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Basic Furniture.png; references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Basic_Furniture.png |
| public/assets/tilesets/sprout_lands/basic_plants.png | 96 × 32 | Not loaded | Exact copy of references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Basic Plants.png; references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Basic_Plants.png |
| public/assets/tilesets/sprout_lands/chest.png | 240 × 96 | Not loaded | Exact copy of references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Chest.png |
| public/assets/tilesets/sprout_lands/doors.png | 16 × 64 | Not loaded | Exact copy of references/public/asset/Sprout Lands - Sprites - Basic pack/Tilesets/Doors.png |
| public/assets/tilesets/sprout_lands/fences.png | 64 × 64 | Not loaded | Exact copy of references/public/asset/Sprout Lands - Sprites - Basic pack/Tilesets/Fences.png |
| public/assets/tilesets/sprout_lands/grass_biom_props.png | 144 × 80 | Not loaded | Exact copy of references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Basic Grass Biom things 1.png; references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Basic_Grass_Biom_things.png |
| public/assets/tilesets/sprout_lands/grass.png | 176 × 112 | Not loaded | Exact copy of references/public/asset/Sprout Lands - Sprites - Basic pack/Tilesets/Grass.png; named in source showcase |
| public/assets/tilesets/sprout_lands/hills.png | 176 × 144 | Not loaded | Exact copy of references/public/asset/Sprout Lands - Sprites - Basic pack/Tilesets/Hills.png |
| public/assets/tilesets/sprout_lands/paths.png | 64 × 64 | Not loaded | Exact copy of references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Paths.png; named in source showcase |
| public/assets/tilesets/sprout_lands/SPROUT_LANDS_LICENSE.txt | — | Not loaded | Exact copy of references/public/asset/Sprout Lands - Sprites - Basic pack/read_me.txt |
| public/assets/tilesets/sprout_lands/water.png | 64 × 16 | Not loaded | Exact copy of references/public/asset/Sprout Lands - Sprites - Basic pack/Tilesets/Water.png |
| public/assets/tilesets/sprout_lands/wood_bridge.png | 80 × 48 | Not loaded | Exact copy of references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Wood Bridge.png; references/public/asset/Sprout Lands - Sprites - Basic pack/Objects/Wood_Bridge.png; named in source showcase |
| public/assets/tilesets/sprout_lands/wooden_house.png | 112 × 80 | Not loaded | Exact copy of references/public/asset/Sprout Lands - Sprites - Basic pack/Tilesets/Wooden House.png |
| public/assets/ui/action_buttons.png | 128 × 64 | Not loaded | Designer-supplied project asset |
| public/assets/ui/dialogue_frame_9slice.png | 48 × 48 | Not loaded | Designer-supplied project asset |
| public/assets/ui/dpad.png | 128 × 128 | Not loaded | Designer-supplied project asset |
| public/assets/ui/nameplate.png | 96 × 28 | Not loaded | Designer-supplied project asset |
| public/assets/ui/title_logo.png | 360 × 96 | Not loaded | Designer-supplied project asset |
| public/assets/ui/ui_icons.png | 192 × 32 | Not loaded | Designer-supplied project asset |

## Why assets are not yet used / what is needed

- The canonical reference sheet is a labeled illustration with a background and uneven pose sizes, not a transparent uniform runtime atlas. Existing processed poses and sheets solve this; retain the original and do not redraw generic replacements.
- Standard character sheets are 192×320 (4×5 cells of 48×64), high-resolution sheets 384×640 (96×128 cells). The engine currently uses standard cells at 2/3 scale with nearest-neighbor rendering. Wave and jump frames exist but have no gameplay trigger; sitting and all four walk/idle directions are registered. JSON manifests describe animation rows; current engine maps rows in code rather than reading those manifests.
- Raw poses and portraits are available. Portraits need a compatible dialogue presentation; using the high-resolution sheet requires changing frame dimensions and scale while preserving foot collision size. No art replacement is necessary.
- Sprout Lands terrain/object atlases need tile/frame selection, a map layout and matching collision placement. They cannot be inserted as whole images in place of the current floor. The original pack allows non-commercial use and requires Cup Nooble credit; the supplied license is preserved.
- Crops from basic furniture could replace several generic room props. This requires choosing exact atlas regions, not generating new art.
- Farm animals, tools, crops, milk/egg items and generic farmer characters have no current story role. In particular, generic farmer sprites must not replace the two supplied fox characters.
- Bitmask reference pictures, palette images and the Aseprite palette are authoring aids. ZIP is the supplied archive; duplicate spaced/underscored files need no runtime duplication.
- Extra scenery and UI images are usable, but the working renderer has not been wired to all of them. Replacing the UI also needs save/resume, FOP and dialogue callback integration; simply importing the showcase UI would not preserve gameplay.
- Existing drawn tail clusters overlap. The reference defines the companion as nine-tailed; tiny atlas frames do not make every tail independently countable. Preserve her supplied art rather than invent a new tail design.
