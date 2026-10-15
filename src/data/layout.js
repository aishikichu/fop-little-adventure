// Stable interaction coordinates and IDs preserve existing saves. Narrative is in story.js.
export const layout = [
  {
    "id": "enjp",
    "color": 3422807,
    "objects": [
      {
        "id": "meet",
        "x": 230,
        "y": 180,
        "kind": "friend"
      },
      {
        "id": "sign",
        "x": 150,
        "y": 110,
        "kind": "sign"
      },
      {
        "id": "portal",
        "x": 420,
        "y": 130,
        "kind": "portal"
      }
    ]
  },
  {
    "id": "hello",
    "color": 3427147,
    "objects": [
      {
        "id": "hello-note",
        "x": 195,
        "y": 140,
        "kind": "note"
      },
      {
        "id": "hello-pause",
        "x": 370,
        "y": 240,
        "kind": "flower"
      },
      {
        "id": "hello-star",
        "x": 470,
        "y": 145,
        "kind": "star",
        "star": "hello"
      }
    ]
  },
  {
    "id": "pocket",
    "color": 3427657,
    "objects": [
      {
        "id": "merchant",
        "x": 315,
        "y": 110,
        "kind": "merchant",
        "cue": "suspicious-pocket"
      },
      {
        "id": "pocket-spoon",
        "x": 185,
        "y": 185,
        "kind": "spoon",
        "group": "pocket",
        "cue": "abwaa"
      },
      {
        "id": "pocket-noise",
        "x": 335,
        "y": 250,
        "kind": "bottle",
        "group": "pocket",
        "cue": "scream"
      },
      {
        "id": "pocket-pocket",
        "x": 465,
        "y": 155,
        "kind": "pocket",
        "group": "pocket"
      }
    ]
  },
  {
    "id": "fop",
    "color": 2641224,
    "objects": [
      {
        "id": "frog-small",
        "x": 190,
        "y": 135,
        "kind": "frog",
        "cue": "fop"
      },
      {
        "id": "frog-many",
        "x": 360,
        "y": 255,
        "kind": "frog",
        "cue": "fops"
      },
      {
        "id": "choir",
        "x": 460,
        "y": 155,
        "kind": "frog",
        "puzzle": "fop"
      }
    ]
  },
  {
    "id": "room",
    "color": 4931670,
    "objects": [
      {
        "id": "room-chat",
        "x": 185,
        "y": 130,
        "kind": "computer",
        "group": "room"
      },
      {
        "id": "room-call",
        "x": 365,
        "y": 115,
        "kind": "call",
        "group": "room"
      },
      {
        "id": "room-music",
        "x": 460,
        "y": 235,
        "kind": "music",
        "group": "room"
      },
      {
        "id": "room-keepsake",
        "x": 230,
        "y": 260,
        "kind": "keepsake",
        "group": "room"
      },
      {
        "id": "room-silly",
        "x": 500,
        "y": 100,
        "kind": "pocket",
        "cue": "fop"
      }
    ]
  },
  {
    "id": "garden",
    "color": 2703175,
    "objects": [
      {
        "id": "garden-flowers",
        "x": 210,
        "y": 130,
        "kind": "flower"
      },
      {
        "id": "garden-star",
        "x": 440,
        "y": 135,
        "kind": "star",
        "star": "garden"
      },
      {
        "id": "bench",
        "x": 340,
        "y": 235,
        "kind": "bench",
        "ending": true
      }
    ]
  }
];
