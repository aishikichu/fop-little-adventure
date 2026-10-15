import fs from 'node:fs';
import assert from 'node:assert/strict';
import {opening,ending,chapters,lines,cues,assets} from '../src/data/story.js';
import {storyDraft as draft} from '../src/data/story.draft.js';

// Review exports only. This never writes game source, images, index.html or dist/.
assert.deepEqual(draft.scenes.map(s=>s.id),chapters.map(s=>s.id));
for(const scene of draft.scenes)assert.deepEqual(scene.interactions.map(o=>o.id),chapters.find(c=>c.id===scene.id).objects.map(o=>o.id));
for(const a of assets)assert.ok(fs.existsSync('public/'+a.path),'Missing '+a.path);
const block=text=>text.split('\n').map(x=>'> '+x).join('\n');
const pages=items=>items.map((text,i)=>`${i+1}. ${text}`).join('\n');
let current='# Current playable story — exact transcript\n\nSnapshot of src/data/story.js. This is the Phaser game served by the current production preview, not the separate source-index visual demo. Fictional connective dialogue written for the prototype is not a record of your real conversations. Most pages are currently labeled “a little memory”, rather than assigned character voices.\n\n## Opening\n\n'+block(opening)+'\n';
for(const c of chapters){
 current+=`\n## ${c.subtitle}: ${c.title}\n\nObjective: ${c.quest}\n`;
 for(const o of c.objects){current+=`\n### ${o.label} (${o.id})\n\n${pages(o.dialogue)||'(Uses the puzzle or bench dialogue below.)'}\n`;if(o.cue)current+=`\nSubtitle cue: ${cues[o.cue]}\n`;}
 if(c.id==='pocket')current+='\n### After all three items\n\n'+pages(lines.pocketDone)+'\n';
 if(c.id==='fop')current+='\n### Choir instructions\n\n'+pages(lines.fopIntro)+'\n\nReady: '+lines.fopReady+'\n\nMistake: '+lines.fopMiss+'\n\nSuccess:\n\n'+pages(lines.fopWin)+'\n';
 if(c.id==='room')current+='\n### After the four main memories\n\n'+pages(lines.roomDone)+'\n';
 if(c.id==='garden')current+='\n### Bench sequence\n\n'+pages(lines.gardenSeat)+'\n';
 current+='\nTransition: '+(c.id==='garden'?'Sit, constellation rises, final letter opens.':'Fade out, advance to the next chapter, fade in. No spoken transition page currently exists.')+'\n';
}
current+='\n## Final letter\n\n'+block(ending)+'\n\n## Shared messages\n\n';
for(const key of ['locked','benchLocked','gate','saved','saveFailed','star'])current+=`- ${key}: ${JSON.stringify(lines[key])}${['saved','star'].includes(key)?' (declared but not currently displayed)':''}\n`;
current+='\n## Separate visual-showcase dialogue — not active in the current Phaser preview\n\nThe root index.html imports src/ui/index.js instead of src/main.js. Its sample dialogue includes:\n\n'+pages([
'Companion: Look at the moonlight through the trees... Every little step we take together fills this journey with warmth ♡',
'Choice: I am so glad to be here with you.',
'Choice: Let’s find the remaining Memory Stars together!',
'Companion: Hehe, promise me we will always remember this night! ✨',
'Player: Did you hear that gentle chime? A Memory Star is glowing nearby...',
'Choice: Let’s search by the stone lanterns.',
'Choice: Hold my hand and follow me.',
'Ending: From our first meeting beneath the lanterns to the quiet garden of our vows, every memory star glows for you. Thank you for making my world so bright.',
])+'\n\nThese are unapproved demo lines, not facts about your relationship. The showcase also labels the final chapter “Starlit Vows Forever”. Neither vows nor a promise should be carried into the approved story without your explicit wording. EndingScreen.js has its own fallback letter, also separate from story.js.\n';
fs.writeFileSync('docs/STORY-CURRENT.md',current);

let review='# FOP! — complete personalization draft\n\n**NOT LIVE.** Edit src/data/story.draft.js; rerun `node scripts/review-story.mjs` to refresh this document. All bracketed text needs your words or can be removed. IDs preserve the working chapter order and interactions. Descriptions are planning notes; transition/star text is proposed, not new behavior already added. No dialogue is attributed to her unless you supply it.\n\nThe opening and final letter below retain the wording you supplied in the original brief. Existing named jokes (Suspicious Pocket System, FOP, abwaa and the scream) are retained. Invented spoon/soup/receipt stories are replaced with personalizable slots.\n\n## 0. Opening\n\n'+block(draft.opening)+'\n';
for(const [i,s] of draft.scenes.entries()){
 review+=`\n## ${i+1}. ${s.title}\n\n**Setting:** ${s.description}\n\n**Goal:** ${s.objective}\n`;
 for(const o of s.interactions)review+=`\n### ${o.label}\n\nSpeaker: ${o.speaker}. Edit ID: \`${o.id}\`.\n\n${pages(o.dialogue)}\n`;
 if(s.mistakeMessage)review+=`\n**Mistake feedback:** ${s.mistakeMessage}\n`;
 if(s.completionDialogue)review+='\n### Completion dialogue\n\n'+pages(s.completionDialogue)+'\n';
 if(s.starMessage)review+=`\n**Star:** ${s.starMessage}\n`;
 review+=`\n**Transition:** ${s.transition}\n`;
}
review+='\n## 7. Final message\n\n'+block(draft.ending)+'\n\n## Shared prompts\n\n'+Object.entries(draft.system).map(([k,v])=>`- ${k}: ${v}`).join('\n')+'\n\n## Approval\n\nReview the complete wording above, fill or delete the bracketed slots, and approve the draft before it is connected to gameplay. Personal memories, her exact words and the garden response are yours to define. The current game and both existing visual presentations have not been changed by this draft.\n';
fs.writeFileSync('docs/STORY-DRAFT.md',review);

const inventory=JSON.parse(fs.readFileSync('docs/asset-review/inventory.json','utf8').replace(/^\uFEFF/,''));
const sources=inventory.filter(i=>i.path.startsWith('references/'));
const loaded=new Map(assets.map(a=>['public/'+a.path,a.key]));
const unusedLoaded=new Set(['lantern','rug','sky']);
const demo=fs.readFileSync('index.html','utf8');
let report='# Asset audit\n\nThe folder is named **references/** (plural), not reference/. All '+inventory.length+' files under references/ and public/assets/ were inventoried; every raster image was included in a contact sheet. PNGs and the GIF first frame were visually reviewed. The ZIP and Aseprite palette were inventoried, not treated as runtime images. No 3D model/rig/animation files are present.\n\n## What the playable Phaser build uses\n\n';
report+='| Key | Runtime path | Use |\n|---|---|---|\n';
for(const a of assets)report+=`| ${a.key} | ${a.path} | ${unusedLoaded.has(a.key)?'Preloaded, but never drawn':a.key==='frog'?'Frame 0 only; croak/hop animation unused':a.key==='star'?'Frame 0, bobbing tween; spin frames unused':['player','companion'].includes(a.key)?'Directional idle/walk and sitting; wave/jump unused':'Drawn in relevant chapters'} |\n`;
report+='\nThe Phaser floor, paths, portals, lights, constellation and several interaction props are still programmatic geometry. It does not render the Sprout Lands terrain sheets. The current source-index showcase is different: it draws additional lantern/pond/room/constellation assets; its three Sprout Lands entries are loaded but never drawn. The designer UI uses portraits and some UI images, whereas the active Phaser fallback UI does not.\n\n## Every file\n\n“Unused” means not used by the active Phaser renderer, not unusable or recommended for deletion. Exact source-copy matches are based on SHA-256, not filenames. Derived character sprites are visually consistent with the original reference but are processed crops/atlases, not byte-identical originals.\n\n| File | Dimensions | Active Phaser status | Source / other use |\n|---|---|---|---|\n';
for(const i of inventory){
 const key=loaded.get(i.path);let status=key?(unusedLoaded.has(key)?'Loaded, not drawn':'Rendered'):'Not loaded';
 const matches=sources.filter(s=>s.sha256===i.sha256&&s.path!==i.path);
 let note=i.path.startsWith('references/')?'Original reference retained unchanged':matches.length?'Exact copy of '+matches.map(x=>x.path).join('; '):i.path.startsWith('public/assets/characters/')?'Processed character art / manifest': 'Designer-supplied project asset';
 if(demo.includes('/'+i.path.replace(/^public\//,''))&&i.path.startsWith('public/'))note+='; named in source showcase';
 report+=`| ${i.path} | ${i.width?i.width+' × '+i.height:'—'} | ${status} | ${note} |\n`;
}
report+='\n## Why assets are not yet used / what is needed\n\n- The canonical reference sheet is a labeled illustration with a background and uneven pose sizes, not a transparent uniform runtime atlas. Existing processed poses and sheets solve this; retain the original and do not redraw generic replacements.\n- Standard character sheets are 192×320 (4×5 cells of 48×64), high-resolution sheets 384×640 (96×128 cells). The engine currently uses standard cells at 2/3 scale with nearest-neighbor rendering. Wave and jump frames exist but have no gameplay trigger; sitting and all four walk/idle directions are registered. JSON manifests describe animation rows; current engine maps rows in code rather than reading those manifests.\n- Raw poses and portraits are available. Portraits need a compatible dialogue presentation; using the high-resolution sheet requires changing frame dimensions and scale while preserving foot collision size. No art replacement is necessary.\n- Sprout Lands terrain/object atlases need tile/frame selection, a map layout and matching collision placement. They cannot be inserted as whole images in place of the current floor. The original pack allows non-commercial use and requires Cup Nooble credit; the supplied license is preserved.\n- Crops from basic furniture could replace several generic room props. This requires choosing exact atlas regions, not generating new art.\n- Farm animals, tools, crops, milk/egg items and generic farmer characters have no current story role. In particular, generic farmer sprites must not replace the two supplied fox characters.\n- Bitmask reference pictures, palette images and the Aseprite palette are authoring aids. ZIP is the supplied archive; duplicate spaced/underscored files need no runtime duplication.\n- Extra scenery and UI images are usable, but the working renderer has not been wired to all of them. Replacing the UI also needs save/resume, FOP and dialogue callback integration; simply importing the showcase UI would not preserve gameplay.\n- Existing drawn tail clusters overlap. The reference defines the companion as nine-tailed; tiny atlas frames do not make every tail independently countable. Preserve her supplied art rather than invent a new tail design.\n';
fs.writeFileSync('docs/ASSET-AUDIT.md',report);
console.log(JSON.stringify({files:inventory.length,images:inventory.filter(x=>x.width).length,referenceFiles:sources.length,loadedAssets:assets.length,drawnAssets:assets.length-unusedLoaded.size,chapters:draft.scenes.length,interactions:draft.scenes.reduce((n,s)=>n+s.interactions.length,0),draftNotImported:true}));
