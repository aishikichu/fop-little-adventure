/**
 * FOP! — PERSONALIZATION DRAFT (NOT LIVE)
 * Edit the text below, in reading order. No game code imports this file yet.
 * Review the full readable version in docs/STORY-DRAFT.md before approving.
 * Square brackets mark details ONLY YOU can supply. They are not memories we know.
 * You may remove optional lines instead of filling them in.
 * Keep scene/interaction IDs unchanged: these match the working game and saves.
 * Descriptions and transition messages are proposed content, not new mechanics.
 * Opening and the original ending come from your project brief.
 * All new personal dialogue is left as a placeholder, including her words.
 */
export const storyDraft = {
  status: 'DRAFT — awaiting your edits and approval; not connected to gameplay',

  // 0. TITLE SCREEN — displayed before the adventure begins.
  opening: `hey youuu :p

i made you a little game to play hehe

it might be stupid or cringe but i wanted to make something for you, so i hope you like it 🥹

ready for a little adventure? ♡`,

  // These identify speakers; they do not change the character art or roles.
  characters: {
    player: { name: '[MY NAME OR NICKNAME]', role: 'Creator; lavender-blue hair' },
    companion: { name: '[HER NAME OR NICKNAME]', role: 'Recipient; cream-blonde hair, nine tails' },
  },

  scenes: [
    // 1. MEETING — talk to her to unlock the next area; no star awarded yet.
    {
      id: 'enjp',
      title: 'EN-JP, where it all began',
      description: 'An original virtual meeting area inspired by EN-JP. [A VISUAL DETAIL YOU REMEMBER ABOUT WHERE WE MET]',
      objective: 'Say hello to the cream-haired fox girl.',
      interactions: [
        { id: 'meet', label: 'A familiar stranger', speaker: 'player', dialogue: [
          '[WHAT I WANT TO SAY ABOUT FIRST MEETING YOU]',
          '[OUR FIRST HELLO — use remembered words, or describe the moment without quoting her]',
          'Come with me? There are a few memories I want to show you.',
        ] },
        { id: 'sign', label: 'EN / JP', speaker: 'player', dialogue: [
          'EN / JP — where we first met.',
          '[A DETAIL ABOUT THIS PLACE THAT MATTERS TO US]',
        ] },
        { id: 'portal', label: 'Somewhere online', speaker: 'player', dialogue: [
          '[A MEMORY WE SHARE]',
        ] },
      ],
      transition: 'Let’s visit the first memory.',
    },

    // 2. FIRST HELLO — optional memories, then Memory Star 1.
    {
      id: 'hello',
      title: 'The first hello',
      description: 'A quiet path with small memory markers. [A COLOR, PLACE OR DETAIL THAT FITS OUR EARLY DAYS]',
      objective: 'Find the light at the end of the memory path.',
      interactions: [
        { id: 'hello-note', label: 'Our first hello', speaker: 'player', dialogue: [
          '[HOW WE STARTED TALKING OR SPENDING TIME TOGETHER]',
        ] },
        { id: 'hello-pause', label: 'A little memory', speaker: 'player', dialogue: [
          '[A MEMORY WE SHARE]',
          '[WHY I WANT TO REMEMBER THIS]',
        ] },
        { id: 'hello-star', label: 'The first little light', speaker: 'player', dialogue: [
          'This one is for the first hello.',
          '[WHAT THAT BEGINNING MEANS TO ME]',
        ] },
      ],
      starMessage: 'Memory Star 1 — The First Hello',
      transition: 'Next stop: the Suspicious Pocket System.',
    },

    // 3. POCKET SYSTEM — the same three-item puzzle; personalize the item labels.
    {
      id: 'pocket',
      title: 'The Suspicious Pocket System',
      description: 'A fictional pocket merchant represents the joke named in your brief. The stall is game scenery, not a claimed real memory.',
      objective: 'Inspect all three pocket items.',
      interactions: [
        { id: 'merchant', label: 'Pocket proprietor', speaker: 'merchant', dialogue: [
          'SUSPICIOUS POCKET SYSTEM!',
          '[OUR INSIDE JOKE]',
          'Have a look at the three items.',
        ] },
        { id: 'pocket-spoon', label: '[POCKET ITEM 1]', speaker: 'player', dialogue: [
          '[OUR INSIDE JOKE — what should this first item mean?]',
          'abwaa',
        ] },
        { id: 'pocket-noise', label: '[POCKET ITEM 2]', speaker: 'player', dialogue: [
          '[OUR INSIDE JOKE — what should this second item mean?]',
          '[a dramatic scream — optional cue from the brief]',
        ] },
        { id: 'pocket-pocket', label: '[POCKET ITEM 3]', speaker: 'player', dialogue: [
          '[OUR INSIDE JOKE — what should this third item mean?]',
        ] },
      ],
      completionDialogue: [
        'There’s a Memory Star inside!',
        '[OUR POCKET SYSTEM PUNCHLINE]',
      ],
      starMessage: 'Memory Star 2 — Suspicious Pocket System',
      transition: 'There are frogs up ahead. Everybody FOP?',
    },

    // 4. FOP — keep the forgiving, untimed three-input puzzle.
    {
      id: 'fop',
      title: 'Everybody FOP',
      description: 'A frog-filled forest representing the FOP joke supplied in the brief.',
      objective: 'Repeat the three frog calls. There is no timer.',
      interactions: [
        { id: 'frog-small', label: 'fop', speaker: 'frog', dialogue: ['fop'] },
        { id: 'frog-many', label: 'fops', speaker: 'frog', dialogue: ['fops'] },
        { id: 'choir', label: 'Everybody FOP!', speaker: 'frog choir', dialogue: [
          'EVERYBODY FOP!',
          'Repeat: FOP → FOPS → EVERYBODY FOP! Take as long as you like.',
        ] },
      ],
      mistakeMessage: 'abwaa! Try the highlighted call again. No rush.',
      completionDialogue: ['EVERYBODY FOP!', '[OUR INSIDE JOKE — optional FOP memory or punchline]'],
      starMessage: 'Memory Star 3 — Everybody FOP',
      transition: 'Let’s look at a few of the smaller moments, too.',
    },

    // 5. MEMORY ROOM — all four main objects are still required; cushion is optional.
    {
      id: 'room',
      title: 'A thousand little moments',
      description: 'A symbolic room for shared online time. Personalize the four objects; this need not depict a real room.',
      objective: 'Visit the chat, call, music and keepsake memories.',
      interactions: [
        { id: 'room-chat', label: 'The chat window', speaker: 'player', dialogue: [
          '[A MEMORY WE SHARE — a message or conversation]',
          '[WHY THIS MESSAGE MATTERED TO ME]',
        ] },
        { id: 'room-call', label: 'The voice call', speaker: 'player', dialogue: [
          '[A MEMORY WE SHARE — a voice call]',
          '[SOMETHING SHE ALWAYS SAYS]',
        ] },
        { id: 'room-music', label: '[A SONG OR ANOTHER SHARED MOMENT]', speaker: 'player', dialogue: [
          '[A SONG WE ACTUALLY SHARED — or replace this with another real memory]',
          '[WHY I ASSOCIATE THIS WITH YOU]',
        ] },
        { id: 'room-keepsake', label: '[A KEEPSAKE OR SMALL MEMORY]', speaker: 'player', dialogue: [
          '[A MEMORY WE SHARE]',
          '[WHAT THIS SMALL THING MEANS TO ME]',
        ] },
        { id: 'room-silly', label: '[AN OPTIONAL SILLY OBJECT]', speaker: 'player', dialogue: [
          '[OUR INSIDE JOKE]',
        ] },
      ],
      completionDialogue: ['[WHAT THESE LITTLE MOMENTS MEAN TO ME]'],
      starMessage: 'Memory Star 4 — A Thousand Little Moments',
      transition: 'There’s one more place I wanted to revisit: the garden.',
    },

    // 6. GARDEN — final star, then the same bench / constellation ending.
    {
      id: 'garden',
      title: 'The garden',
      description: 'The garden where the creator confessed their feelings, as stated in the brief. [DETAILS OF THE REAL GARDEN YOU WANT INCLUDED]',
      objective: 'Find the final star, then sit together on the bench.',
      interactions: [
        { id: 'garden-flowers', label: 'Moonlit flowers', speaker: 'player', dialogue: [
          '[A DETAIL I REMEMBER ABOUT THE GARDEN]',
        ] },
        { id: 'garden-star', label: 'One year of little lights', speaker: 'player', dialogue: [
          'The last Memory Star.',
          '[WHAT THIS GARDEN MEMORY MEANS TO ME]',
        ] },
        { id: 'bench', label: 'Sit for a while', speaker: 'player', dialogue: [
          'This is the garden where I told you how I felt.',
          '[WHAT I WANT TO SAY ABOUT THAT MOMENT NOW]',
          'I’m glad I got to meet you.',
        ] },
      ],
      starMessage: 'Memory Star 5 — The Garden',
      transition: 'The two characters sit together. The five stars rise into a constellation.',
    },
  ],

  // 7. FINAL LETTER — your original brief, editable in full.
  // Add personal details only if you choose. Do not invent her confession response.
  ending: `hey, you made it!! :D

i know this was a really silly little adventure, but i wanted to make something for you.

it's been a whole year since we met in EN-JP, and somehow we've collected so many random memories along the way.

from the suspicious pocket system and all the fops to the little moments that actually meant a lot to me.

i still remember that garden, too.

i'm really glad i got to meet you.

thank you for being part of my life this past year. i hope this made you smile, even just a little.

happy one year since we met, stupid ♡

p.s. everybody fop.`,

  // SYSTEM TEXT — these explain existing rules; they make no personal claims.
  system: {
    lockedExit: 'There is still a memory waiting here. Let’s find it before we go.',
    lockedBench: 'Let’s collect all five Memory Stars, then sit for a while.',
    nextAreaPrompt: 'Next memory →',
    saved: 'Progress saved automatically',
    saveFailed: 'Saving is unavailable in this browser. You can still finish this session.',
  },
};
