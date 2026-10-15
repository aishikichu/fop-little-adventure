// One-time authoring snapshot from the user's notes in docs/STORY-DRAFT.md.
// Writes only NEW version-two drafts. Never regenerates the user's edited file.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {storyDraft as original} from '../src/data/story.draft.js';
const draft=structuredClone(original);
draft.status='DRAFT 2 — based on your handwritten notes; not connected to gameplay';
draft.opening=`hey there pookie :p

i made you a little game to play hehe

it might be stupid or cringe but i wanted to make something for you, so i hope you like it ♡

ready for a little adventure? ♡`;
draft.characters.player.name='[YOUR NAME OR NICKNAME]';
draft.characters.companion.name='[HER NAME OR NICKNAME — pookie is used in the opening]';
const scene=id=>draft.scenes.find(s=>s.id===id);
const object=(s,id)=>scene(s).interactions.find(o=>o.id===id);

// 1. Keep the meeting grounded in the location already supplied.
Object.assign(scene('enjp'),{
 description:'An original virtual meeting area inspired by EN-JP in VRChat. [A REAL DETAIL OF THE MEETING PLACE]. Keep the existing character appearances: lavender player, yellow/cream companion.',
 objective:'Say hello to the yellow fox girl.',
 transition:'Come on. There are a few little moments I want to revisit with you.',
});
object('enjp','meet').dialogue=[
 'hey, pookie :p',
 'back to where it all began.',
 '[WHAT YOU REMEMBER ABOUT OUR FIRST HELLO]',
 'a whole year later, and here i am making you a little game about us.',
 'come with me? ♡',
];
object('enjp','sign').dialogue=['EN / JP.','this is where we first met in VRChat.','[A DETAIL ABOUT THIS PLACE THAT YOU WANT HER TO RECOGNIZE]'];
object('enjp','portal').dialogue=['[A MEMORY FROM OUR FIRST MEETING — optional; leave this out if you do not want another interaction here]'];

// 2. A bridge from the meeting to spending more time together.
Object.assign(scene('hello'),{
 description:'A quiet path between memories. This is a symbolic transition, not an invented real location.',
 transition:'there’s one day i want to spend a little longer remembering.',
});
object('hello','hello-note').dialogue=['[HOW WE STARTED HANGING OUT AFTER THAT FIRST HELLO]','somehow, that first hello turned into all this time spent together.'];
object('hello','hello-pause').dialogue=['playing games. helping each other. being goofy.','i’m glad we got to do those things together.'];
object('hello','hello-star').dialogue=['our first little star.','for the hello that came before all these memories.'];

// 3. Replace the pocket story in the PROPOSAL, keeping existing IDs for later mapping.
Object.assign(scene('pocket'),{
 title:'A little company',
 description:'A field of grass where you lay down together while she was not feeling well. Three memory points represent telling stories, helping each other, and playing games/being goofy. This replaces the pocket merchant scene in this draft only.',
 objective:'Spend a little time together: visit all three memories in the grass.',
 transition:'okay, pookie. ready for some very serious fopping?',
 completionDialogue:[
  'we were just spending time together. telling stories, playing games, being silly.',
  'but somewhere in all of that, i started feeling something more.',
  'i wasn’t sure how you felt. i just knew i liked being there with you.',
 ],
 starMessage:'Memory Star 2 — A Little Company',
});
Object.assign(object('pocket','merchant'),{label:'Stay with me for a while',speaker:'player',dialogue:[
 'you weren’t feeling well, and you asked me to hang out and keep you entertained for a while.',
 'so we lay down together in the grass.',
 'let’s stay here for a little bit again.',
]});
Object.assign(object('pocket','pocket-spoon'),{label:'Tell me a story',speaker:'player',dialogue:[
 'we lay there telling stories.',
 '[A STORY WE TOLD EACH OTHER — or a detail you remember from that conversation]',
 'i liked having that time with you.',
]});
Object.assign(object('pocket','pocket-noise'),{label:'A little help',speaker:'player',dialogue:[
 'we helped each other, too.',
 '[SOMETHING WE HELPED EACH OTHER WITH]',
 'that belongs in here just as much as the silly stuff.',
]});
Object.assign(object('pocket','pocket-pocket'),{label:'Games and goofiness',speaker:'player',dialogue:[
 'and, of course, we played games and acted goofy together.',
 '[A GAME WE PLAYED OR SOMETHING SILLY WE DID]',
 'very important activities. obviously :p',
]});

// 4. Foxes, not frogs. Internal IDs remain stable; visual changes are not implemented.
Object.assign(scene('fop'),{
 description:'A fox-filled forest for Everybody FOP. These are fictional game characters, not additional people from your memories. Fox artwork and presentation need a later integration pass using existing suitable assets.',
 objective:'Repeat the three fox calls. There is no timer.',
 completionDialogue:['EVERYBODY FOP!','[OUR FOP JOKE OR A FOP MOMENT YOU WANT TO INCLUDE — optional]'],
 transition:'there are a few more little things i wanted to keep here.',
});
Object.assign(object('fop','frog-small'),{label:'A little fox',speaker:'fox',dialogue:['fop']});
Object.assign(object('fop','frog-many'),{label:'More foxes',speaker:'foxes',dialogue:['fops']});
Object.assign(object('fop','choir'),{label:'Everybody FOP!',speaker:'fox choir',dialogue:['EVERYBODY FOP!','Repeat: FOP → FOPS → EVERYBODY FOP! Take as long as you like.']});

// 5. The user mentioned games, but supplied no shared song. Do not invent one.
Object.assign(scene('room'),{
 description:'A symbolic room holding the smaller details of time spent together. Four main memories: messages, voice calls, games and a keepsake. Exact messages and quotes remain yours to fill in.',
 objective:'Visit the messages, voice call, game and keepsake memories.',
 completionDialogue:['whole days doing random things together.','some silly, some small, some that meant more to me than i knew how to say.','i wanted to save a little space for them here.'],
 transition:'there’s one more place i wanted to take you.',
});
object('room','room-chat').dialogue=['[A MESSAGE OR CONVERSATION YOU WANT TO KEEP]','[WHY THAT ONE STAYED WITH YOU]'];
object('room','room-call').dialogue=['[A MOMENT FROM ONE OF OUR CALLS]','[SOMETHING SHE ALWAYS SAYS — only use her actual words]'];
Object.assign(object('room','room-music'),{label:'Playing together',dialogue:['[A GAME WE PLAYED TOGETHER]','[A SPECIFIC MOMENT FROM THAT GAME]','it’s one of the little things i wanted to put in here.']});
Object.assign(object('room','room-keepsake'),{label:'A little keepsake',dialogue:['[A SMALL THING, SCREENSHOT OR MEMORY YOU WANT TO INCLUDE]','[WHAT IT MEANS TO YOU]']});
Object.assign(object('room','room-silly'),{label:'One more silly thing',dialogue:['[OUR INSIDE JOKE — optional]']});

// 6. Preserve the garden, without adding a response, promise or mutual confession.
scene('garden').description='The garden where you told her how you felt. [A DETAIL OF THE REAL GARDEN]. Keep this gentle; do not infer her feelings or invent her response.';
object('garden','garden-flowers').dialogue=['[A DETAIL YOU REMEMBER ABOUT THE GARDEN]'];
object('garden','garden-star').dialogue=['the last little star.','for this garden, and for telling you how i felt.'];
object('garden','bench').dialogue=['this is where i told you how i felt.','[WHAT YOU WANT TO SAY ABOUT THAT MOMENT NOW — optional]','i’m really glad i got to meet you, pookie.','let’s sit for a little while. ♡'];

// 7. Polish the user's revised ending without restoring the removed pocket/vows/PS.
draft.ending=`hey, you made it!! :D

i know this was a really silly little adventure, but i wanted to make something for you.

it's been a whole year since we met in VRChat, and somehow we've collected so many random memories along the way.

whole days spent doing random things, playing games together, and all the fops in between. so many little moments that actually meant a lot to me.

i'm really glad i got to meet you.

thank you for being part of my life this past year. i hope this made you smile, even just a little.

happy one year since we met, pookers ♡`;

for(const s of draft.scenes)assert.deepEqual(s.interactions.map(x=>x.id),original.scenes.find(x=>x.id===s.id).interactions.map(x=>x.id));
const jsPath='src/data/story.draft-v2.js',mdPath='docs/STORY-DRAFT-V2.md';
for(const p of [jsPath,mdPath])assert.ok(!fs.existsSync(p),`Refusing to overwrite ${p}; edit that draft directly or choose a new version.`);
fs.writeFileSync(jsPath,`/**
 * FOP! — DRAFT 2, NOT LIVE.
 * Based on your edits in docs/STORY-DRAFT.md; that file is preserved.
 * Edit text, labels and descriptions here. Brackets mean details still needed.
 * Scene order: opening → EN-JP → hello → grass/company → fox FOP → room → garden → ending.
 * The old pocket/frog/music IDs are compatibility keys, not story wording.
 * No scene, artwork, puzzle or save changes have been implemented.
 * Do not run the old review-story.mjs to regenerate the edited first draft.
 */
export const storyDraftV2 = ${JSON.stringify(draft,null,2)};\n`);
let md=`# FOP! — story draft 2

**For your review — not implemented in the game.** Based on your edits to STORY-DRAFT.md. Your edited version is preserved.

This draft keeps “hey there pookie”, changes the pocket chapter to keeping her company in the grass, makes Everybody FOP a fox scene, and follows your revised “pookers” ending. Her request is paraphrased rather than presented as an exact quote. Your feelings are expressed as yours; her feelings remain unspecified.

All spoken prose below is proposed wording for your approval, not a verbatim record. Brackets mark details only you can supply. EN-JP and the Garden stay because you retained those sections.

## Story outline

1. Your invitation: “hey there pookie :p”.
2. Return to EN-JP and remember meeting her.
3. Follow the first-hello path; collect Star 1.
4. Keep her company in the grass: stories, helping each other, games and goofiness; collect Star 2. Your feelings begin to come into focus.
5. Everybody FOP with foxes; keep the forgiving three-call game; collect Star 3.
6. A room for messages, calls, games and a keepsake; collect Star 4.
7. Return to the Garden, collect Star 5, and sit together without inventing her response.
8. Your thank-you letter, ending “happy one year since we met, pookers ♡”.

## 0. Opening

${draft.opening}
`;
for(const [i,s] of draft.scenes.entries()){
 md+=`\n## ${i+1}. ${s.title}\n\n**Setting:** ${s.description}\n\n**Goal:** ${s.objective}\n`;
 for(const o of s.interactions)md+=`\n### ${o.label}\n\n**Speaker:** ${o.speaker==='player'?'You, the creator':o.speaker}.\n\n${o.dialogue.map((t,n)=>`${n+1}. ${t}`).join('\n')}\n`;
 if(s.mistakeMessage)md+=`\n**On a wrong call:** ${s.mistakeMessage}\n`;
 if(s.completionDialogue)md+='\n### When the memory is complete\n\n'+s.completionDialogue.map((t,n)=>`${n+1}. ${t}`).join('\n')+'\n';
 if(s.starMessage)md+=`\n**Star:** ${s.starMessage}\n`;
 md+=`\n**Transition:** ${s.transition}\n`;
}
md+=`\n## 7. Final message\n\n${draft.ending}

## What still needs your words

- Your first hello and a recognizable EN-JP detail.
- One story you told in the grass, something you helped each other with, and a game/goofy moment.
- Any specific FOP joke you want to include.
- A message, call memory, actual phrase she says, game moment and keepsake. Optional objects can stay simple or be omitted.
- A garden detail and anything you want to say about that moment now.

You described her as possibly being a little tsundere about her feelings. I kept the uncertainty in “i wasn’t sure how you felt” instead of turning it into a claim that she felt the same way. No dialogue is written as a new quote from her.

## Suggested gameplay treatment — proposal only

For the grass chapter, the smallest change is to reuse the existing three-interaction structure: visit the story memory, the helping memory and the games/goofiness memory, then award Star 2. Make them moments spent together, not items from a merchant. Sitting or lying-down presentation would need a separate animation pass; the supplied sitting pose is available, but a lying-down pose has not been confirmed.

You also suggested actually doing the memories together. A more interactive version could add one short activity based on a real game or story you name. That is an option to discuss after the wording is right; this draft does not invent a game you played or add new mechanics.

Everybody FOP becomes fox-themed in wording and proposed visuals. The current game still renders frogs until an approved visual integration pass. Use suitable existing fox artwork; do not silently substitute generic or newly generated characters.

Internal scene/object IDs are intentionally unchanged in the companion JS draft so later integration can preserve the five-star progression and saves. The pocket merchant, suspicious-item jokes and old music interaction have new proposed meanings; none of those changes is live yet.

## Shared prompts

${Object.entries(draft.system).map(([key,text])=>`- ${key}: ${text}`).join('\n')}

## Editing this version

You can edit this Markdown file directly, as you did with the first draft. It is the review copy; the JS file is a separate starting snapshot, not an automatic sync. Before implementation, your latest written edits take priority and will be reconciled. Nothing will be wired into the game until you approve the revised story.
`;
fs.writeFileSync(mdPath,md);
console.log(`Created ${jsPath} and ${mdPath}. Preserved the user-edited first draft. All six scene interaction lists retain their original IDs.`);
