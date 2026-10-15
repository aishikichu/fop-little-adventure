/**
 * FOP! — LIVE STORY (approved Draft 3, including your final Markdown edits).
 * Edit dialogue strings, labels, titles, opening and ending here.
 * Scenes are chronological. One dialogue string = one page.
 * Keep IDs stable; coordinates and artwork live separately in world.js/assets.js.
 * Unanswered personal prompts were omitted from play, preserved in your draft.
 */
export const story = {
  "opening": "hey there pookie :p\n\ni made you a little game to play hehe\n\nit might be stupid or cringe but i wanted to make something for you, so i hope you like it ♡\n\nready for a little adventure? ♡",
  "characters": {
    "player": {
      "name": "aishikichu",
      "role": "Creator; lavender-blue hair"
    },
    "companion": {
      "name": "memma",
      "role": "Recipient; cream-blonde hair, nine tails"
    }
  },
  "scenes": [
    {
      "id": "enjp",
      "title": "EN-JP, where it all began",
      "description": "An original virtual meeting area inspired by EN-JP in VRChat. [A REAL DETAIL OF THE MEETING PLACE]. Keep the existing character appearances: lavender player (aishikichu), yellow/cream companion (memma).",
      "objective": "Say hello to memma.",
      "interactions": [
        {
          "id": "meet",
          "label": "A familiar stranger",
          "speaker": "aishikichu",
          "dialogue": [
            "hey, memma :p",
            "back to where it all began.",
            "a whole year later, and here i am making you a little game about us.",
            "come with me? ♡"
          ]
        },
        {
          "id": "sign",
          "label": "EN / JP",
          "speaker": "aishikichu",
          "dialogue": [
            "EN / JP.",
            "this is where we first met in VRChat."
          ]
        },
        {
          "id": "portal",
          "label": "Somewhere online",
          "speaker": "aishikichu",
          "dialogue": []
        }
      ],
      "transition": "Come on. There are a few little moments I want to revisit with you."
    },
    {
      "id": "hello",
      "title": "The first hello",
      "description": "A quiet path between memories. This is a symbolic transition, not an invented real location.",
      "objective": "Find the light at the end of the memory path.",
      "interactions": [
        {
          "id": "hello-note",
          "label": "Our first hello",
          "speaker": "aishikichu",
          "dialogue": [
            "we talked for a long time in your home world, joking about ERP and a bunch of things. and me calling you my fynshyt, lols :p",
            "somehow, that first hello turned into all this time spent together."
          ]
        },
        {
          "id": "hello-pause",
          "label": "A little memory",
          "speaker": "aishikichu",
          "dialogue": [
            "playing games. helping each other. being goofy.",
            "i’m glad we got to do those things together."
          ]
        },
        {
          "id": "hello-star",
          "label": "The first little light",
          "speaker": "aishikichu",
          "dialogue": [
            "our first little star.",
            "for the hello that came before all these memories."
          ]
        }
      ],
      "starMessage": "Memory Star 1 — The First Hello",
      "transition": "there’s one day i want to spend a little longer remembering."
    },
    {
      "id": "pocket",
      "title": "A little company",
      "description": "A field of grass where you lay down together while she was not feeling well. Three memory points represent telling stories, helping each other, and playing games/being goofy. This replaces the pocket merchant scene in this draft only.",
      "objective": "Spend a little time together: visit all three memories in the grass.",
      "interactions": [
        {
          "id": "merchant",
          "label": "Stay with me for a while",
          "speaker": "aishikichu",
          "dialogue": [
            "you weren’t feeling well, and you asked me to hang out and keep you entertained for a while.",
            "so we lay down together in the grass.",
            "let’s stay here for a little bit again."
          ]
        },
        {
          "id": "pocket-spoon",
          "label": "Tell me a story",
          "speaker": "aishikichu",
          "dialogue": [
            "we lay there telling stories.",
            "childhood stories. sad ones, funny ones, goofy ones, and scary ones.",
            "i liked having that time with you."
          ]
        },
        {
          "id": "pocket-noise",
          "label": "A little help",
          "speaker": "aishikichu",
          "dialogue": [
            "we helped each other, too.",
            "that belongs in here just as much as the silly stuff."
          ]
        },
        {
          "id": "pocket-pocket",
          "label": "Games and goofiness",
          "speaker": "aishikichu",
          "dialogue": [
            "and, of course, we played games and acted goofy together.",
            "VRChat, Fortnite, Red Dead Redemption.",
            "very important activities. obviously :p"
          ]
        }
      ],
      "completionDialogue": [
        "we were just spending time together. telling stories, playing games, being silly.",
        "but somewhere in all of that, i started feeling something more.",
        "i wasn’t sure how you felt. i just knew i liked being there with you."
      ],
      "starMessage": "Memory Star 2 — A Little Company",
      "transition": "okay, memma. ready for some very serious fopping?"
    },
    {
      "id": "fop",
      "title": "Everybody FOP",
      "description": "A fox-filled forest for Everybody FOP. These are fictional game characters, not additional people from your memories. Fox artwork and presentation need a later integration pass using existing suitable assets.",
      "objective": "Repeat the three fox calls. There is no timer.",
      "interactions": [
        {
          "id": "frog-small",
          "label": "A little fox",
          "speaker": "fox",
          "dialogue": [
            "fop"
          ]
        },
        {
          "id": "frog-many",
          "label": "More foxes",
          "speaker": "foxes",
          "dialogue": [
            "fops"
          ]
        },
        {
          "id": "choir",
          "label": "Everybody FOP!",
          "speaker": "fox choir",
          "dialogue": [
            "EVERYBODY FOP!",
            "Repeat: FOP → FOPS → EVERYBODY FOP! Take as long as you like."
          ]
        }
      ],
      "mistakeMessage": "abwaa! Try the highlighted call again. No rush.",
      "completionDialogue": [
        "EVERYBODY FOP!"
      ],
      "starMessage": "Memory Star 3 — Everybody FOP",
      "transition": "there are a few more little things i wanted to keep here."
    },
    {
      "id": "room",
      "title": "A thousand little moments",
      "description": "A symbolic room holding the smaller details of time spent together. Four main memories: messages, voice calls, games and a keepsake. Exact messages and quotes remain yours to fill in.",
      "objective": "Visit the messages, voice call, game and keepsake memories.",
      "interactions": [
        {
          "id": "room-chat",
          "label": "The chat window",
          "speaker": "aishikichu",
          "dialogue": [
            "i love remembering those conversations when we were getting to know each other.",
            "all the teasing, too :p",
            "i wasn’t expecting you to be there for me the way you were. that stayed with me, and i loved it."
          ]
        },
        {
          "id": "room-call",
          "label": "The voice call",
          "speaker": "aishikichu",
          "dialogue": [
            "i love those calls when you wake up and ask what my plans are for the day.",
            "you watching me work, and us finding fun things to do together.",
            "“wake up wake up wake up im bad alarm”",
            "that one belongs in here, obviously :p"
          ]
        },
        {
          "id": "room-music",
          "label": "Red Dead Redemption 2",
          "speaker": "aishikichu",
          "dialogue": [
            "Red Dead Redemption 2.",
            "hunting animals together, then drinking at your underground bar.",
            "that was really fun. i wanted to keep a little piece of it here."
          ]
        },
        {
          "id": "room-keepsake",
          "label": "New Year’s together",
          "speaker": "aishikichu",
          "dialogue": [
            "singing together last New Year’s.",
            "it meant a lot to me that you celebrated with me, hanging out, singing and drinking.",
            "i’m really glad we got to share that."
          ]
        },
        {
          "id": "room-silly",
          "label": "Our collection of nonsense",
          "speaker": "aishikichu",
          "dialogue": [
            "phantom pain. fops. refart. nigro fop.",
            "and honestly, so much more nonsense.",
            "we’ve collected quite a lot of it, haven’t we :p"
          ]
        }
      ],
      "completionDialogue": [
        "whole days doing random things together.",
        "some silly, some small, some that meant more to me than i knew how to say.",
        "i wanted to save a little space for them here."
      ],
      "starMessage": "Memory Star 4 — A Thousand Little Moments",
      "transition": "there’s one more place i wanted to take you."
    },
    {
      "id": "garden",
      "title": "The garden",
      "description": "The VRChat world you built to confess your feelings on February 14. It had a greenhouse, a gazebo and fireflies. These are visual details from your notes; their final presentation is a later art/layout task.",
      "objective": "Find the final star, then sit together on the bench.",
      "interactions": [
        {
          "id": "garden-flowers",
          "label": "The world I made for you",
          "speaker": "aishikichu",
          "dialogue": [
            "the greenhouse. the gazebo. the fireflies.",
            "i made this world for you, for February 14.",
            "you were looking around, amazed, and we talked for a bit.",
            "i still remember that."
          ]
        },
        {
          "id": "garden-star",
          "label": "One year of little lights",
          "speaker": "aishikichu",
          "dialogue": [
            "the last little star.",
            "for this garden, and for telling you how i felt."
          ]
        },
        {
          "id": "bench",
          "label": "Sit for a while",
          "speaker": "aishikichu",
          "dialogue": [
            "this is where i told you how i felt.",
            "you told me you weren’t ready to be in a relationship yet.",
            "and i told you i’d wait, stay, and keep doing the thing i love: making you smile.",
            "i’m glad i did, because you really mean a lot to me. ♡",
            "i’m really glad i got to meet you, memma.",
            "let’s sit for a little while. ♡"
          ]
        }
      ],
      "starMessage": "Memory Star 5 — The Garden",
      "transition": "The two characters sit together. The five stars rise into a constellation."
    }
  ],
  "ending": "hey, you made it!! :D\n\ni know this was a really silly little adventure, but i wanted to make something for you.\n\nit's been a whole year since we met in VRChat, and somehow we've collected so many random memories along the way.\n\nwhole days spent doing random things, playing games together, and all the fops in between. so many little moments that actually meant a lot to me.\n\ni'm really glad i got to meet you.\n\nthank you for being part of my life this past year. i hope this made you smile, even just a little.\n\nhappy one year since we met, pookie ♡",
  "system": {
    "lockedExit": "There is still a memory waiting here. Let’s find it before we go.",
    "lockedBench": "Let’s collect all five Memory Stars, then sit for a while.",
    "nextAreaPrompt": "Next memory →",
    "saved": "Progress saved automatically",
    "saveFailed": "Saving is unavailable in this browser. You can still finish this session."
  },
  "ui": {
    "choir": "THE FOX CHOIR",
    "fopTitle": "Everybody FOP!",
    "fopInstructions": "Repeat: FOP → FOPS → EVERYBODY FOP!",
    "fopReady": "Your turn. Take as long as you like.",
    "chapterComplete": "Memory kept",
    "album": "Our little constellation",
    "subtitle": "a little adventure through our memories",
    "endingHeading": "I’m glad we met. ♡",
    "nextMemory": "Next memory →",
    "enjpSign": "EN / JP · somewhere online"
  }
};

export const opening=story.opening;
export const ending=story.ending;
