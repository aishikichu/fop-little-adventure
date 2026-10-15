// FOP! — Complete Elevated Designer UI for Phaser Adventure Engine
import { bridge } from '../game/bridge.js';
import { opening, story } from '../data/story.js';
import { VFXManager } from './VFXManager.js';
import { SoundFX } from './SoundFX.js';

export function installDesignerUI() {
  const root = document.querySelector('#interface');
  if (!root) return;

  const base = import.meta.env.BASE_URL || '/';

  // Inject Ambient VFX Canvas if not already present
  let vfxCanvas = document.getElementById('ambient-vfx-canvas');
  if (!vfxCanvas) {
    vfxCanvas = document.createElement('canvas');
    vfxCanvas.id = 'ambient-vfx-canvas';
    document.body.insertBefore(vfxCanvas, document.body.firstChild);
    const vfx = new VFXManager(vfxCanvas);
    vfx.start();
  }

  // Populate Interface HTML
  root.innerHTML = `
    <header>
      <a class="brand" href="#" aria-label="Open adventure menu">
        FOP!
        <span>a little adventure through our memories ♡</span>
      </a>
      <div class="tools">
        <button id="sound">Sound on</button>
        <button id="menuButton">Menu</button>
      </div>
    </header>

    <section class="chapter">
      <div class="chapter-info">
        <span id="chapterNumber"></span>
        <h1 id="chapterTitle"></h1>
        <p id="quest"></p>
      </div>
      <div id="stars" aria-label="Memory stars">☆☆☆☆☆</div>
    </section>

    <div id="prompt"></div>
    <div id="subtitle" role="status" aria-live="polite"></div>

    <!-- Elevated Dialogue Panel with Dynamic Character Portraits -->
    <section id="dialogue" class="panel dialogue" hidden>
      <div class="dialogue-portrait-container">
        <img id="portraitImg" src="${base}assets/characters/companion/portraits/neutral.png" alt="Speaker Portrait" />
      </div>
      <div class="dialogue-body">
        <small id="speaker">Companion</small>
        <p id="dialogueText"></p>
        <button id="advance">Continue ↵</button>
      </div>
    </section>

    <!-- The Fox Choir Minigame Modal -->
    <section id="minigame" class="panel modal" hidden>
      <small id="fopChoirLabel" style="color: var(--c-cyan-glow); letter-spacing: 2px;"></small>
      <div class="fop-portraits" aria-label="Fox choir">
        <img src="${base}assets/characters/player/portraits/wink.png" alt="Lavender fox" width="64" height="64" />
        <img src="${base}assets/characters/companion/portraits/wink.png" alt="Golden fox" width="64" height="64" />
      </div>
      <h2 id="fopTitle"></h2>
      <p id="fopInstructions"></p>
      <p id="fopFeedback" role="status"></p>
      <div class="fopButtons">
        <button data-fop="0">FOP</button>
        <button data-fop="1">FOPS</button>
        <button data-fop="2">EVERYBODY FOP!</button>
      </div>
    </section>

    <!-- Main Menu / Opening Screen -->
    <section id="menu" class="panel modal opening" hidden>
      <div class="title-word-container">
        <h1 class="word-8bit-title">FOP! <span class="heart-8bit">♡</span></h1>
        <p class="word-8bit-subtitle">a little adventure through our memories</p>
      </div>
      <div class="opening-letter-card">
        <p id="opening"></p>
      </div>

      <div class="menuActions">
        <button id="start" class="primary">START ADVENTURE</button>
        <button id="resume">Resume adventure</button>
        <button id="replay">Replay ending</button>
        <button id="restart">Restart adventure</button>
        <button id="closeMenu">Back to game</button>
      </div>

      <p class="instructions">
        WASD / Arrow keys to walk · E / Space to interact<br>
        On touchscreens, use the direction pad and ✦ button.
      </p>

      <div style="font-size: 11px; color: var(--c-lavender-light); margin-top: 14px; line-height: 1.5; border-top: 1px solid rgba(139,123,184,0.3); padding-top: 10px;">
        Made for memma with love, and fops. ♡ — by aishikichu<br>
        Assets — <em>Sprout Lands</em> by <strong>Cup Nooble</strong> (<a href="https://cupnooble.itch.io/sprout-lands-asset-pack" target="_blank" style="color: var(--c-pink-light);">cupnooble.itch.io</a>).
      </div>
    </section>

    <!-- Romantic Climax Ending Screen -->
    <section id="ending" class="panel modal ending" hidden>
      <div style="margin-bottom: 6px;">
        <img src="${base}assets/tilesets/constellation_sky/constellations.png" alt="Constellations" style="width: 130px; filter: drop-shadow(0 0 8px rgba(255,238,140,0.8));" />
      </div>
      <small style="color: var(--c-gold-light); letter-spacing: 2px;">FIVE STARS. ONE WHOLE YEAR.</small>
      <h2>I’m glad we met. ♡</h2>
      
      <div class="ending-polaroids">
        <div class="ending-polaroid">
          <img src="${base}assets/characters/player/portraits/love.png" alt="aishikichu" />
          <span>aishikichu ♡</span>
        </div>
        <div class="ending-polaroid">
          <img src="${base}assets/characters/companion/portraits/love.png" alt="memma" />
          <span>memma ♡</span>
        </div>
      </div>

      <p id="endingText"></p>
      <button id="endingMenu">Back to menu</button>
    </section>

    <!-- Mobile Touch Controls -->
    <div class="touch">
      <div class="dpad">
        <button data-dir="up" aria-label="Walk up">▲</button>
        <button data-dir="left" aria-label="Walk left">◀</button>
        <button data-dir="down" aria-label="Walk down">▼</button>
        <button data-dir="right" aria-label="Walk right">▶</button>
      </div>
      <button id="interact" aria-label="Interact">✦</button>
    </div>

    <footer>
      <span>Walk a little. Remember a lot.</span>
      <span>✦ MEMORY WALK / 01</span>
    </footer>
  `;

  const el = id => document.getElementById(id);
  const show = (id, on) => {
    const target = el(id);
    if (target) target.hidden = !on;
  };

  el('opening').textContent = opening;
  el('fopChoirLabel').textContent = story.ui.choir;
  el('fopTitle').textContent = story.ui.fopTitle;
  el('fopInstructions').textContent = story.ui.fopInstructions;

  // Bind Standard Actions
  const bind = (id, action) => {
    const btn = el(id);
    if (btn) btn.onclick = () => {
      SoundFX.playClick();
      bridge.dispatch(action);
    };
  };

  for (const [id, a] of Object.entries({
    start: 'start',
    resume: 'resume',
    replay: 'replay',
    advance: 'advance',
    sound: 'sound',
    menuButton: 'menu',
    closeMenu: 'close-menu'
  })) {
    bind(id, a);
  }

  el('endingMenu').onclick = () => {
    SoundFX.playClick();
    show('ending', false);
    bridge.dispatch('resume');
    bridge.dispatch('menu');
  };

  el('restart').onclick = () => {
    SoundFX.playClick();
    show('menu', false);
    show('dialogue', false);
    show('minigame', false);
    show('ending', false);
    bridge.dispatch('restart');
  };

  root.querySelector('.brand').onclick = (e) => {
    e.preventDefault();
    SoundFX.playClick();
    bridge.dispatch('menu');
  };

  el('interact').onclick = () => {
    bridge.dispatch(el('dialogue').hidden ? 'interact' : 'advance');
  };

  // Minigame Buttons
  root.querySelectorAll('[data-fop]').forEach(b => {
    b.onclick = () => {
      SoundFX.playClick();
      bridge.dispatch('fop', Number(b.dataset.fop));
    };
  });

  // Touch D-Pad
  root.querySelectorAll('[data-dir]').forEach(b => {
    const move = down => bridge.dispatch('move', { direction: b.dataset.dir, down });
    b.onpointerdown = e => {
      e.preventDefault();
      b.setPointerCapture(e.pointerId);
      move(true);
    };
    b.onpointerup = b.onpointercancel = b.onlostpointercapture = () => move(false);
  });

  let subtitleTimer;
  let lastStarsCount = 0;

  // Subscribe to Engine Bridge Events
  bridge.subscribe(({ type, payload: p }) => {
    if (type === 'state') {
      el('chapterTitle').textContent = p.title;
      el('chapterNumber').textContent = p.subtitle;
      el('quest').textContent = p.quest;
      el('stars').textContent = '★'.repeat(p.stars.length) + '☆'.repeat(5 - p.stars.length);
      el('stars').setAttribute('aria-label', `${p.stars.length} of 5 Memory Stars`);
      el('sound').textContent = p.sound ? 'Sound on' : 'Sound off';

      if (p.stars.length > lastStarsCount) {
        SoundFX.playStarCollect();
        lastStarsCount = p.stars.length;
      }
    }

    if (type === 'menu') {
      show('menu', true);
      show('resume', p.canResume);
      show('restart', p.canResume);
      show('start', !p.canResume);
      show('replay', p.canReplay);
      show('closeMenu', p.canResume);
    }

    if (type === 'menu-close') {
      show('menu', false);
    }

    if (type === 'dialogue') {
      show('dialogue', true);
      const speakerEl = el('speaker');
      el('dialogueText').textContent = p.text;
      el('advance').textContent = p.typing ? 'Show all →' : 'Continue →';

      // Update Character Portrait & Emote
      const portraitImg = el('portraitImg');
      // Explicit character identity wins over the speaker's display name.
      const charFolder = ['player', 'companion'].includes(p.character)
        ? p.character
        : (['you', 'player', 'aishikichu'].includes(p.speaker?.toLowerCase()) ? 'player' : 'companion');
      const emote = ['neutral', 'wink', 'curious', 'love', 'shy'].includes(p.emote) ? p.emote : 'neutral';
      const portraitPath = `${base}assets/characters/${charFolder}/portraits/${emote}.png`;
      if (portraitImg.getAttribute('src') !== portraitPath) portraitImg.src = portraitPath;

      // Name display mapping and color coding
      let displayName = p.speaker;
      if (displayName === 'player' || displayName === 'you') displayName = 'aishikichu';
      if (displayName === 'companion' || displayName === 'pookie') displayName = 'memma';
      speakerEl.textContent = displayName;
      portraitImg.alt = `${displayName} — ${emote}`;
      speakerEl.className = `${charFolder}-speaker`;

      // Voice chirp
      if (p.typing && p.text.length > 0 && p.text.length % 3 === 0) {
        SoundFX.playDialogueBlip(charFolder);
      }
    }

    if (type === 'dialogue-close') {
      show('dialogue', false);
    }

    if (type === 'prompt') {
      el('prompt').textContent = p.text ? `✦ ${p.text}  ·  E / tap` : '';
    }

    if (type === 'subtitle') {
      el('subtitle').textContent = p.text;
      clearTimeout(subtitleTimer);
      subtitleTimer = setTimeout(() => {
        el('subtitle').textContent = '';
      }, 3500);
    }

    if (type === 'minigame') {
      show('minigame', true);
      el('fopFeedback').textContent = p.feedback;
      root.querySelectorAll('[data-fop]').forEach((b, i) => {
        b.classList.toggle('next', i === p.index);
        b.setAttribute('aria-label', b.textContent + (i === p.index ? ' — next call' : ''));
      });
    }

    if (type === 'minigame-close') {
      show('minigame', false);
    }

    if (type === 'ending') {
      show('ending', true);
      el('endingText').textContent = p.text;
      el('endingMenu').focus();
      SoundFX.playQuestComplete();
    }

    if (type === 'ending-close') {
      show('ending', false);
    }
  });
}
