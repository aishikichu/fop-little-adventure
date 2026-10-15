// Title Screen & Main Menu for FOP!
import { SoundFX } from './SoundFX.js';

export class MainMenu {
  constructor(container, onStartGame) {
    this.container = container;
    this.onStartGame = onStartGame;
    this.element = null;
    this.creditsModal = null;
    this.isOpen = true;

    this.createDOM();
  }

  createDOM() {
    this.element = document.createElement('div');
    this.element.className = 'main-menu-layer';
    this.element.style.cssText = `
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      display: flex; flex-direction: column;
      justify-content: center; align-items: center;
      background: radial-gradient(circle at 50% 35%, #252849 0%, #121324 85%);
      z-index: 400;
      transition: opacity 0.8s ease-in-out;
    `;

    this.element.innerHTML = `
      <div style="text-align: center; margin-bottom: 24px; animation: floatLogo 3s ease-in-out infinite alternate;">
        <img src="/assets/ui/title_logo.png" alt="FOP! Logo" style="max-width: 380px; width: 85%; filter: drop-shadow(0 6px 16px rgba(139,123,184,0.4));" />
        <div style="font-family: var(--font-pixel-label); font-size: 16px; color: var(--c-pink-light); margin-top: 10px; letter-spacing: 1px;">
          ✦ A Little Adventure Through Our Memories ✦
        </div>
      </div>

      <div class="menu-btn-group" style="display: flex; flex-direction: column; gap: 14px; width: min(280px, 80%);">
        <button class="modal-btn play-btn" style="border-color: var(--c-gold-mid); background: var(--c-navy-mid); font-size: 20px; font-weight: 700; color: var(--c-gold-light);">
          ▶ Start Adventure
        </button>
        <button class="modal-btn gallery-btn">
          📖 Memory Album
        </button>
        <button class="modal-btn credits-btn">
          ✨ Credits
        </button>
      </div>

      <div style="position: absolute; bottom: 16px; font-size: 13px; color: var(--c-lavender-light); opacity: 0.8;">
        Cozy pixel adventure for Player & Companion ♡
      </div>
    `;

    // Add inline keyframe for floatLogo
    const style = document.createElement('style');
    style.textContent = `
      @keyframes floatLogo {
        from { transform: translateY(0); }
        to { transform: translateY(-8px); }
      }
    `;
    document.head.appendChild(style);

    this.container.appendChild(this.element);

    // Event listeners
    const playBtn = this.element.querySelector('.play-btn');
    playBtn.addEventListener('click', () => {
      SoundFX.ensureContext();
      SoundFX.playClick();
      this.hide();
      if (typeof this.onStartGame === 'function') {
        this.onStartGame();
      }
    });

    const galleryBtn = this.element.querySelector('.gallery-btn');
    galleryBtn.addEventListener('click', () => {
      SoundFX.playClick();
      alert('Memory Album: Collect all 5 Memory Stars across the chapters to unlock the full constellation scrapbook!');
    });

    const creditsBtn = this.element.querySelector('.credits-btn');
    creditsBtn.addEventListener('click', () => {
      SoundFX.playClick();
      this.showCreditsModal();
    });

    this.createCreditsModal();
  }

  createCreditsModal() {
    this.creditsModal = document.createElement('div');
    this.creditsModal.className = 'fop-modal-backdrop';
    this.creditsModal.innerHTML = `
      <div class="fop-modal-window">
        <div class="modal-title">CREDITS & LICENSING</div>
        
        <div style="text-align: left; font-size: 14px; line-height: 1.6; color: var(--c-cream-light); margin-bottom: 20px;">
          <p style="margin-bottom: 12px;">
            <strong style="color: var(--c-gold-light);">✦ Game Title:</strong><br>
            FOP! — A Little Adventure Through Our Memories
          </p>

          <p style="margin-bottom: 12px;">
            <strong style="color: var(--c-gold-light);">✦ Characters:</strong><br>
            • <strong>Player:</strong> Lavender-blue hair chibi adventurer<br>
            • <strong>Companion:</strong> Cream-blonde hair with nine fox tails
          </p>

          <p style="margin-bottom: 12px;">
            <strong style="color: var(--c-gold-light);">✦ Environmental Assets & Tilesets:</strong><br>
            • <strong>Sprout Lands - Sprites - Basic Pack</strong><br>
            Created by <strong>Cup Nooble</strong> (<a href="https://cupnooble.itch.io/sprout-lands-asset-pack" target="_blank" style="color: var(--c-pink-light);">cupnooble.itch.io</a>)<br>
            <em>Licensed under Sprout Lands non-commercial terms with creator credit.</em>
          </p>

          <p style="margin-bottom: 12px;">
            <strong style="color: var(--c-gold-light);">✦ Original Pixel Scenery & UI:</strong><br>
            • Torii Gate & Moonlit EN-JP Meeting Area<br>
            • Suspicious Pocket System Stall & Merchant<br>
            • Frog Forest, Pond & Animated Frogs<br>
            • Cozy Memory Room & Fireplace<br>
            • Moonlit Confession Garden & Arch<br>
            • Final Constellation Starfield & Memory Stars<br>
            • Handcrafted UI Design System & Web Audio Engine
          </p>
        </div>

        <button class="modal-btn close-credits-btn" style="width: 100%;">Close</button>
      </div>
    `;

    const closeBtn = this.creditsModal.querySelector('.close-credits-btn');
    closeBtn.addEventListener('click', () => {
      SoundFX.playClick();
      this.creditsModal.classList.remove('open');
    });

    this.container.appendChild(this.creditsModal);
  }

  showCreditsModal() {
    this.creditsModal.classList.add('open');
  }

  show() {
    this.isOpen = true;
    this.element.style.display = 'flex';
    this.element.style.opacity = '1';
    this.element.style.pointerEvents = 'auto';
  }

  hide() {
    this.isOpen = false;
    this.element.style.opacity = '0';
    this.element.style.pointerEvents = 'none';
    setTimeout(() => {
      if (!this.isOpen) this.element.style.display = 'none';
    }, 800);
  }
}
