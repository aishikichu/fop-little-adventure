/**
 * FOP! — DRAFT 3. Not connected to gameplay.
 * Incorporates your edits in docs/STORY-DRAFT-V2.md, which is preserved.
 * Personal memories/quotes come from your notes; prose is polished for review.
 * Remaining brackets are still unanswered personal details, not live dialogue.
 * Keep compatibility IDs unchanged. Edit text and labels freely.
 */
export const storyDraftV3 = {
  "status": "DRAFT 3 — your personal memories added; awaiting wording approval; not live",
  "opening": "hey there pookie :p\n\ni made you a little game to play hehe\n\nit might be stupid or cringe but i wanted to make something for you, so i hope you like it ♡\n\nready for a little adventure? ♡",
  "characters": {
    "player": {
      "name": "[YOUR NAME OR NICKNAME]",
      "role": "Creator; lavender-blue hair"
    },
    "companion": {
      "name": "[HER NAME OR NICKNAME — pookie is used in the opening]",
      "role": "Recipient; cream-blonde hair, nine tails"
    }
  },
  "scenes": [
    {
      "id": "enjp",
      "title": "EN-JP, where it all began",
      "description": "An original virtual meeting area inspired by EN-JP in VRChat. [A REAL DETAIL OF THE MEETING PLACE]. Keep the existing character appearances: lavender player, yellow/cream companion.",
      "objective": "Say hello to the yellow fox girl.",
      "interactions": [
        {
          "id": "meet",
          "label": "A familiar stranger",
          "speaker": "player",
          "dialogue": [
            "hey, pookie :p",
            "back to where it all began.",
            "[WHAT YOU REMEMBER ABOUT OUR FIRST HELLO]",
            "a whole year later, and here i am making you a little game about us.",
            "come with me? ♡"
          ]
        },
        {
          "id": "sign",
          "label": "EN / JP",
          "speaker": "player",
          "dialogue": [
            "EN / JP.",
            "this is where we first met in VRChat.",
            "[A DETAIL ABOUT THIS PLACE THAT YOU WANT HER TO RECOGNIZE]"
          ]
        },
        {
          "id": "portal",
          "label": "Somewhere online",
          "speaker": "player",
          "dialogue": [
            "[A MEMORY FROM OUR FIRST MEETING — optional; leave this out if you do not want another interaction here]"
          ]
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
          "speaker": "player",
          "dialogue": [
            "[HOW WE STARTED HANGING OUT AFTER THAT FIRST HELLO]",
            "somehow, that first hello turned into all this time spent together."
          ]
        },
        {
          "id": "hello-pause",
          "label": "A little memory",
          "speaker": "player",
          "dialogue": [
            "playing games. helping each other. being goofy.",
            "i’m glad we got to do those things together."
          ]
        },
        {
          "id": "hello-star",
          "label": "The first little light",
          "speaker": "player",
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
          "speaker": "player",
          "dialogue": [
            "you weren’t feeling well, and you asked me to hang out and keep you entertained for a while.",
            "so we lay down together in the grass.",
            "let’s stay here for a little bit again."
          ]
        },
        {
          "id": "pocket-spoon",
          "label": "Tell me a story",
          "speaker": "player",
          "dialogue": [
            "we lay there telling stories.",
            "[A STORY WE TOLD EACH OTHER — or a detail you remember from that conversation]",
            "i liked having that time with you."
          ]
        },
        {
          "id": "pocket-noise",
          "label": "A little help",
          "speaker": "player",
          "dialogue": [
            "we helped each other, too.",
            "[SOMETHING WE HELPED EACH OTHER WITH]",
            "that belongs in here just as much as the silly stuff."
          ]
        },
        {
          "id": "pocket-pocket",
          "label": "Games and goofiness",
          "speaker": "player",
          "dialogue": [
            "and, of course, we played games and acted goofy together.",
            "[A GAME WE PLAYED OR SOMETHING SILLY WE DID]",
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
      "transition": "okay, pookie. ready for some very serious fopping?"
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
        "EVERYBODY FOP!",
        "[OUR FOP JOKE OR A FOP MOMENT YOU WANT TO INCLUDE — optional]"
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
          "speaker": "player",
          "dialogue": [
            "i love remembering those conversations when we were getting to know each other.",
            "all the teasing, too :p",
            "i wasn’t expecting you to be there for me the way you were. that stayed with me, and i loved it."
          ]
        },
        {
          "id": "room-call",
          "label": "The voice call",
          "speaker": "player",
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
          "speaker": "player",
          "dialogue": [
            "Red Dead Redemption 2.",
            "hunting animals together, then drinking at your underground bar.",
            "that was really fun. i wanted to keep a little piece of it here."
          ]
        },
        {
          "id": "room-keepsake",
          "label": "New Year’s together",
          "speaker": "player",
          "dialogue": [
            "singing together last New Year’s.",
            "it meant a lot to me that you celebrated with me, hanging out, singing and drinking.",
            "i’m really glad we got to share that."
          ]
        },
        {
          "id": "room-silly",
          "label": "Our collection of nonsense",
          "speaker": "player",
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
          "speaker": "player",
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
          "speaker": "player",
          "dialogue": [
            "the last little star.",
            "for this garden, and for telling you how i felt."
          ]
        },
        {
          "id": "bench",
          "label": "Sit for a while",
          "speaker": "player",
          "dialogue": [
            "this is where i told you how i felt.",
            "you told me you weren’t ready to be in a relationship yet.",
            "and i told you i’d wait, stay, and keep doing the thing i love: making you smile.",
            "i’m glad i did, because you really mean a lot to me. ♡",
            "i’m really glad i got to meet you, pookie.",
            "let’s sit for a little while. ♡"
          ]
        }
      ],
      "starMessage": "Memory Star 5 — The Garden",
      "transition": "The two characters sit together. The five stars rise into a constellation."
    }
  ],
  "ending": "hey, you made it!! :D\n\ni know this was a really silly little adventure, but i wanted to make something for you.\n\nit's been a whole year since we met in VRChat, and somehow we've collected so many random memories along the way.\n\nwhole days spent doing random things, playing games together, and all the fops in between. so many little moments that actually meant a lot to me.\n\ni'm really glad i got to meet you.\n\nthank you for being part of my life this past year. i hope this made you smile, even just a little.\n\nhappy one year since we met, pookers ♡",
  "system": {
    "lockedExit": "There is still a memory waiting here. Let’s find it before we go.",
    "lockedBench": "Let’s collect all five Memory Stars, then sit for a while.",
    "nextAreaPrompt": "Next memory →",
    "saved": "Progress saved automatically",
    "saveFailed": "Saving is unavailable in this browser. You can still finish this session."
  }
};
