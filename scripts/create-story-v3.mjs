// Preserve the user's edited Markdown. Create a new review draft from their notes.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {storyDraftV2} from '../src/data/story.draft-v2.js';
const draft=structuredClone(storyDraftV2);
draft.status='DRAFT 3 — your personal memories added; awaiting wording approval; not live';
const scene=id=>draft.scenes.find(s=>s.id===id);
const interaction=(s,id)=>scene(s).interactions.find(o=>o.id===id);

interaction('room','room-chat').dialogue=[
 'i love remembering those conversations when we were getting to know each other.',
 'all the teasing, too :p',
 'i wasn’t expecting you to be there for me the way you were. that stayed with me, and i loved it.',
];
interaction('room','room-call').dialogue=[
 'i love those calls when you wake up and ask what my plans are for the day.',
 'you watching me work, and us finding fun things to do together.',
 '“wake up wake up wake up im bad alarm”',
 'that one belongs in here, obviously :p',
];
interaction('room','room-music').label='Red Dead Redemption 2';
interaction('room','room-music').dialogue=[
 'Red Dead Redemption 2.',
 'hunting animals together, then drinking at your underground bar.',
 'that was really fun. i wanted to keep a little piece of it here.',
];
interaction('room','room-keepsake').label='New Year’s together';
interaction('room','room-keepsake').dialogue=[
 'singing together last New Year’s.',
 'it meant a lot to me that you celebrated with me, hanging out, singing and drinking.',
 'i’m really glad we got to share that.',
];
interaction('room','room-silly').label='Our collection of nonsense';
interaction('room','room-silly').dialogue=[
 'phantom pain. fops. refart. nigro fop.',
 'and honestly, so much more nonsense.',
 'we’ve collected quite a lot of it, haven’t we :p',
];

scene('garden').description='The VRChat world you built to confess your feelings on February 14. It had a greenhouse, a gazebo and fireflies. These are visual details from your notes; their final presentation is a later art/layout task.';
interaction('garden','garden-flowers').label='The world I made for you';
interaction('garden','garden-flowers').dialogue=[
 'the greenhouse. the gazebo. the fireflies.',
 'i made this world for you, for February 14.',
 'you were looking around, amazed, and we talked for a bit.',
 'i still remember that.',
];
interaction('garden','bench').dialogue=[
 'this is where i told you how i felt.',
 'you told me you weren’t ready to be in a relationship yet.',
 'and i told you i’d wait, stay, and keep doing the thing i love: making you smile.',
 'i’m glad i did, because you really mean a lot to me. ♡',
 'i’m really glad i got to meet you, pookie.',
 'let’s sit for a little while. ♡',
];

const paths=['src/data/story.draft-v3.js','docs/STORY-DRAFT-V3.md'];
for(const p of paths)assert.ok(!fs.existsSync(p),`Refusing to overwrite ${p}`);
assert.deepEqual(draft.scenes.map(s=>s.id),storyDraftV2.scenes.map(s=>s.id));
for(const s of draft.scenes)assert.deepEqual(s.interactions.map(o=>o.id),storyDraftV2.scenes.find(c=>c.id===s.id).interactions.map(o=>o.id));
fs.writeFileSync(paths[0],`/**
 * FOP! — DRAFT 3. Not connected to gameplay.
 * Incorporates your edits in docs/STORY-DRAFT-V2.md, which is preserved.
 * Personal memories/quotes come from your notes; prose is polished for review.
 * Remaining brackets are still unanswered personal details, not live dialogue.
 * Keep compatibility IDs unchanged. Edit text and labels freely.
 */
export const storyDraftV3 = ${JSON.stringify(draft,null,2)};\n`);

let md=`# FOP! — story draft 3

**Personalized wording for your review. Not live in the game.** Your edited STORY-DRAFT-V2.md is preserved. This version folds your new memories into the dialogue, rather than treating the filled-in brackets as unfinished placeholders.

Your tone stays casual and lowercase. The “bad alarm” line is kept as you wrote it. The garden response is now included because you supplied it; it is paraphrased as your recollection, not invented dialogue from her. February 14 has no assumed year.

## Story outline

1. Invite her in: “hey there pookie :p”.
2. Return to EN-JP, where you met in VRChat.
3. Remember the first hello and collect Star 1.
4. Keep her company in the grass: stories, helping each other and games; collect Star 2. Describe your developing feelings from your own perspective.
5. Everybody FOP with foxes; collect Star 3 through the same forgiving three-call game.
6. Revisit getting to know each other, her wake-up calls, Red Dead Redemption 2, New Year’s singing and the nonsense collection; collect Star 4.
7. Return to the VRChat garden you built for February 14: greenhouse, gazebo, fireflies. Collect Star 5; remember your confession and the response you described, then sit together.
8. Your thank-you letter: “happy one year since we met, pookers ♡”.

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

## Remaining optional details

These are the only personal-memory gaps left. You can fill them, remove the optional interactions, or approve implementation with those gaps still marked in the draft:

- Your first hello, how you started hanging out, and a recognizable EN-JP detail.
- A particular story you told while lying in the grass.
- Something you helped each other with.
- A specific game or goofy moment for the grass chapter. Red Dead Redemption 2 already has its own memory-room interaction, so it need not be repeated here.
- An optional FOP moment or punchline.
- Your names/nicknames for speaker labels; “you, the creator” remains the draft label for now.

## Implementation notes — still a proposal

The three grass memories reuse the existing three-interaction progression. Everybody FOP retains its forgiving three inputs but needs fox visuals. The memory room uses four required memories and the optional nonsense object. The garden needs a greenhouse and gazebo layout that fits your supplied art, with fireflies; the exact assets/layout have not been changed or generated by this draft.

The old internal pocket/frog/music IDs stay stable for later save-compatible integration. No live story, controls, star progression, artwork, source entry point or build has changed. Your existing saves are unaffected.

Review the complete wording above before it is wired into the game, as you requested earlier. You can edit this Markdown directly. The accompanying JS file is a starting snapshot and will be reconciled with your latest written edits before implementation.
`;
fs.writeFileSync(paths[1],md);
console.log('Created Draft 3; preserved edited Draft 2. Six scene IDs and all interaction IDs match.');
