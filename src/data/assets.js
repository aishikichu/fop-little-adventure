// Existing designer/reference-derived assets only. Paths are relative to public/.
export const assets=[
 ...['player','companion'].map(key=>({key,path:`assets/characters/${key}/${key}_spritesheet.png`,frameWidth:48,frameHeight:64})),
 ...Object.entries({sakura:'moonlit_meeting/cherry_blossom_tree',lantern:'moonlit_meeting/stone_lantern',hangingLantern:'moonlit_meeting/hanging_lantern',torii:'moonlit_meeting/torii_gate',bookshelf:'memory_room/bookshelf',rug:'memory_room/cozy_rug',memoryFrame:'memory_room/memory_frames',bench:'confession_garden/stone_bench',flower:'confession_garden/glowing_flowers',arch:'confession_garden/garden_arch',fountain:'confession_garden/moon_fountain',sky:'constellation_sky/sky_background',constellation:'constellation_sky/constellations',lilypads:'frog_forest/lilypads',mushrooms:'frog_forest/glowing_mushrooms',grass:'sprout_lands/grass',furniture:'sprout_lands/basic_furniture',plants:'sprout_lands/basic_plants',forest:'sprout_lands/grass_biom_props',wood:'sprout_lands/wooden_house',paths:'sprout_lands/paths'}).map(([key,path])=>({key,path:`assets/tilesets/${path}.png`})),
 {key:'water',path:'assets/tilesets/sprout_lands/water.png',frameWidth:16,frameHeight:16},
 {key:'fireplace',path:'assets/tilesets/memory_room/fireplace.png',frameWidth:48,frameHeight:48},
 {key:'star',path:'assets/items/memory_star.png',frameWidth:32,frameHeight:32},
 ...['player','companion'].flatMap(character=>['neutral','wink','curious','love','shy'].map(emote=>({key:`${character}-${emote}`,path:`assets/characters/${character}/portraits/${emote}.png`}))),
];
export const audio={};
export const cues={abwaa:'abwaa',fop:'fop',fops:'fops','everybody-fop':'EVERYBODY FOP!'};

// Atlas regions selected from supplied Sprout Lands art; source PNGs are unmodified.
export const crops={
 grass:[['ground',16,16,16,16],['grassDetail',0,96,16,16]],
 forest:[['tree',16,0,32,32],['bush',0,32,16,16],['log',16,32,32,16]],
 furniture:[['bed',0,16,16,32],['cabinet',48,16,16,32],['table',32,48,16,16],['stool',64,32,16,16],['book',32,0,16,16]],
 plants:[['plant',0,0,16,16]],
 wood:[['floor',16,32,16,16]],
};
