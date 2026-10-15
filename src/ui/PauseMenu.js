// Cozy Pause & Settings Menu for FOP!
import { SoundFX } from './SoundFX.js';

export class PauseMenu {
  constructor(container, onResume, onRestartChapter, onExitToMenu) {
    this.container = container;
    this.onResume = onResume;
    this.onRestartChapter = onRestartChapter;
    this.onExitToMenu = onExitToMenu;
    this.element = null;
    this.isOpen = false;

    this.createDOM();
    this.bindKeyboard();
  }

  createDOM() {
    this.element = document.createElement('div');
    this.element.className = 'fop-modal-backdrop';
    this.element.innerHTML = `
      <div class="fop-modal-window">
        <div class="modal-title">PAUSED</div>

        <div style="margin-bottom: 20px;">
          <div class="setting-row">
            <span class="setting-label">Sound Effects</span>
            <input type="range" class="setting-slider sfx-slider" min="0" max="100" value="80" />
          </div>
          <div class="setting-row">
            <span class="setting-label">Music Volume</span>
            <input type="range" class="setting-slider bgm-slider" min="0" max="100" value="60" />
          </div>
          <div class="setting-row">
            <span class="setting-label">Mute Audio</span>
            <input type="checkbox" class="mute-checkbox" style="transform: scale(1.3); cursor: pointer; accent-color: var(--c-gold-mid);" />
          </div>
        </div>

        <div style="background: rgba(18, 19, 36, 0.7); border-radius: 12px; padding: 12px; font-size: 13px; color: var(--c-cream-mid); line-height: 1.6; margin-bottom: 20px; text-align: left;">
          <div style="font-family: var(--font-pixel-label); color: var(--c-gold-light); margin-bottom: 4px;">🎮 CONTROLS:</div>
          • <strong>Move:</strong> Arrow Keys / WASD / Virtual D-Pad<br>
          • <strong>Interact / Advance:</strong> Space / Enter / Button A<br>
          • <strong>Run / Cancel:</strong> Shift / Button B<br>
          • <strong>Pause:</strong> Esc / Top-Right Button
        </div>

        <div class="modal-btn-list">
          <button class="modal-btn resume-btn" style="border-color: var(--c-gold-mid); color: var(--c-gold-light);">
            ▶ Resume
          </button>
          <button class="modal-btn restart-btn">
            ↺ Restart Chapter
          </button>
          <button class="modal-btn menu-btn">
            ⌂ Title Menu
          </button>
        </div>
      </div>
    `;

    // Sliders
    const sfxSlider = this.element.querySelector('.sfx-slider');
    sfxSlider.addEventListener('input', (e) => {
      SoundFX.setSFXVolume(e.target.value / 100);
    });

    const bgmSlider = this.element.querySelector('.bgm-slider');
    bgmSlider.addEventListener('input', (e) => {
      SoundFX.setBGMVolume(e.target.value / 100);
    });

    const muteCheck = this.element.querySelector('.mute-checkbox');
    muteCheck.addEventListener('change', (e) => {
      SoundFX.setMute(e.target.checked);
    });

    // Buttons
    this.element.querySelector('.resume-btn').addEventListener('click', () => {
      SoundFX.playClick();
      this.close();
      if (typeof this.onResume === 'function') this.onResume();
    });

    this.element.querySelector('.restart-btn').addEventListener('click', () => {
      SoundFX.playClick();
      this.close();
      if (typeof this.onRestartChapter === 'function') this.onRestartChapter();
    });

    this.element.querySelector('.menu-btn').addEventListener('click', () => {
      SoundFX.playClick();
      this.close();
      if (typeof this.onExitToMenu === 'function') this.onExitToMenu();
    });

    this.container.appendChild(this.element);
  }

  bindKeyboard() {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        if (this.isOpen) {
          this.close();
          if (typeof this.onResume === 'function') this.onResume();
        } else {
          this.open();
        }
      }
    });
  }

  open() {
    this.isOpen = true;
    this.element.classList.add('open');
    if (window.GameEvents && typeof window.GameEvents.emit === 'function') {
      window.GameEvents.emit('game:pause');
    }
  }

  close() {
    this.isOpen = false;
    this.element.classList.remove('open');
    if (window.GameEvents && typeof window.GameEvents.emit === 'function') {
      window.GameEvents.emit('game:resume');
    }
  }
}
