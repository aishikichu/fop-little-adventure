// Emotional Climax & Ending Screen for FOP!
import { SoundFX } from './SoundFX.js';

export class EndingScreen {
  constructor(container, onRestart) {
    this.container = container;
    this.onRestart = onRestart;
    this.element = null;
    this.confessionText = null;
    this.starsCollectedText = null;

    this.createDOM();
  }

  createDOM() {
    this.element = document.createElement('div');
    this.element.className = 'ending-screen-layer';
    this.element.innerHTML = `
      <div class="ending-card">
        <div style="margin-bottom: 8px;">
          <img src="/assets/tilesets/constellation_sky/constellations.png" alt="Constellation" style="width: 140px; filter: drop-shadow(0 0 10px rgba(255,238,140,0.8));" />
        </div>
        <div class="ending-title">OUR MEMORIES AMONG THE STARS</div>

        <div class="ending-letter">
          "From our quiet meeting beneath the moonlit lanterns, past the mysterious stall and whispering frog pond, into our warmest memory room... Every star we collected led us here to the confession garden. Thank you for walking beside me."
        </div>

        <div class="ending-polaroid-row">
          <div class="polaroid-frame">
            <img class="polaroid-photo" src="/assets/characters/player/portraits/love.png" alt="Player Memory" />
            <div style="font-family: var(--font-pixel-label); font-size: 11px; color: #444; margin-top: 4px;">Player ♡</div>
          </div>
          <div class="polaroid-frame">
            <img class="polaroid-photo" src="/assets/characters/companion/portraits/love.png" alt="Companion Memory" />
            <div style="font-family: var(--font-pixel-label); font-size: 11px; color: #444; margin-top: 4px;">Companion ♡</div>
          </div>
        </div>

        <div style="font-family: var(--font-pixel-label); font-size: 18px; color: var(--c-gold-light); margin-bottom: 24px;">
          ✨ All 5 Memory Stars Gathered ✨
        </div>

        <div style="display: flex; justify-content: center; gap: 14px;">
          <button class="modal-btn restart-game-btn" style="border-color: var(--c-gold-mid); color: var(--c-gold-light); padding: 10px 24px;">
            ↺ Relive Adventure
          </button>
        </div>
      </div>
    `;

    const restartBtn = this.element.querySelector('.restart-game-btn');
    restartBtn.addEventListener('click', () => {
      SoundFX.playClick();
      this.hide();
      if (typeof this.onRestart === 'function') {
        this.onRestart();
      }
    });

    this.container.appendChild(this.element);
  }

  show(data = {}) {
    if (data.letter) {
      this.element.querySelector('.ending-letter').textContent = `"${data.letter}"`;
    }
    this.element.classList.add('active');
    SoundFX.playQuestComplete();
  }

  hide() {
    this.element.classList.remove('active');
  }
}
