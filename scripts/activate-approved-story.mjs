// One-time migration of the user-approved Markdown into the live, editable story.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {storyDraftV3} from '../src/data/story.draft-v3.js';
import {chapters as oldChapters} from '../src/data/story.js';
assert.ok(!fs.existsSync('src/data/world.js'),'Migration already applied. Edit story.js directly.');
const markdown=fs.readFileSync('docs/STORY-DRAFT-V3.md','utf8');
const story=structuredClone(storyDraftV3);
delete story.status;
story.characters={player:{name:'you',role:'Creator; lavender-blue hair'},companion:{name:'pookie',role:'Recipient; cream-blonde hair, nine tails'}};
const chunks=markdown.split(/^## /m);
const section=n=>chunks.find(x=>x.startsWith(n+'. '));
story.opening=section(0).split('\n').slice(1).join('\n').trim();
story.ending=section(7).split('\n').slice(1).join('\n').trim();
const omitted=[];
function clean(text){
 if(!text.startsWith('['))return text;
 if(/^\[[A-Z][A-Z ’—?]+/.test(text)){omitted.push(text);return null}
 const prose=text.slice(1,-1);
 if(prose.startsWith('We talk'))return 'we talked for a long time in your home world, joking about ERP and a bunch of things. and me calling you my fynshyt, lols :p';
 if(prose.startsWith('childhood'))return 'childhood stories. sad ones, funny ones, goofy ones, and scary ones.';
 if(prose.startsWith('vrchat,'))return 'VRChat, Fortnite, Red Dead Redemption.';
 return prose;
}
for(const [i,s] of story.scenes.entries()){
 const sec=section(i+1);assert.ok(sec,s.id);
 const parts=sec.split(/^### /m).slice(1);
 for(const [j,o] of s.interactions.entries()){
  const part=parts[j];assert.ok(part,o.id);
  o.label=part.split('\n')[0].trim();
  o.dialogue=[...part.matchAll(/^\d+\. (.+)$/gm)].map(m=>clean(m[1].trim())).filter(Boolean);
 }
 const result=parts.find(x=>x.startsWith('When the memory is complete'));
 if(result)s.completionDialogue=[...result.matchAll(/^\d+\. (.+)$/gm)].map(m=>clean(m[1].trim())).filter(Boolean);
 s.transition=sec.match(/\*\*Transition:\*\* (.+)/)?.[1]||s.transition;
 s.objective=sec.match(/\*\*Goal:\*\* (.+)/)?.[1]||s.objective;
 // Descriptions are editor notes, never displayed as dialogue.
}
story.ui={choir:'THE FOX CHOIR',fopTitle:'Everybody FOP!',fopInstructions:'Repeat: FOP → FOPS → EVERYBODY FOP!',fopReady:'Your turn. Take as long as you like.',chapterComplete:'Memory kept',album:'Our little constellation',subtitle:'a little adventure through our memories',endingHeading:'I’m glad we met. ♡',nextMemory:'Next memory →',enjpSign:'EN / JP · somewhere online'};
const header=`/**
 * FOP! — LIVE STORY (approved Draft 3, including your final Markdown edits).
 * Edit dialogue strings, labels, titles, opening and ending here.
 * Scenes are chronological. One dialogue string = one page.
 * Keep IDs stable; coordinates and artwork live separately in world.js/assets.js.
 * Unanswered personal prompts were omitted from play, preserved in your draft.
 */\n`;
fs.writeFileSync('src/data/story.js',header+'export const story = '+JSON.stringify(story,null,2)+';\n\nexport const opening=story.opening;\nexport const ending=story.ending;\n');
const layout=oldChapters.map(c=>({id:c.id,color:c.id==='pocket'?0x344d49:c.color,objects:c.objects.map(o=>{const {dialogue,label,...config}=o;return config})}));
fs.writeFileSync('src/data/layout.js','// Stable interaction coordinates and IDs preserve existing saves. Narrative is in story.js.\nexport const layout = '+JSON.stringify(layout,null,2)+';\n');
if(!fs.existsSync('visual-showcase.html'))fs.copyFileSync('index.html','visual-showcase.html');
fs.writeFileSync('index.html','<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#191a31"><link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22%3E%3Ctext y=%2226%22 font-size=%2228%22%3E%E2%98%85%3C/text%3E%3C/svg%3E"><title>FOP! — A Little Adventure Through Our Memories</title></head><body><main id="app"><div id="game" aria-label="FOP adventure world"></div><div id="interface"></div></main><script type="module" src="/src/main.js"></script></body></html>\n');
fs.writeFileSync('docs/STORY-INTEGRATION.md','# Approved story integration\n\nThe live narrative is now src/data/story.js. It includes the final Markdown edits from STORY-DRAFT-V3.md. Original drafts are preserved. Coordinates, asset references and save-compatible IDs are separate.\n\nUnanswered optional lines omitted from play:\n\n'+omitted.map(s=>'- '+s).join('\n')+'\n\nThe optional prologue portal has no supplied dialogue and is omitted. The helping memory keeps the approved general lines, without inventing a specific event.\n');
console.log('Activated approved story; preserved visual showcase and drafts. Omitted '+omitted.length+' unanswered lines.');
