// Cozy In-Game HUD for FOP!
import { SoundFX } from './SoundFX.js';

export class HUD {
  constructor(container, onPauseClick) {
    this.container = container;
    this.onPauseClick = onPauseClick;
    this.element = null;
    this.starCountText = null;
    this.questTitle = null;
    this.questDesc = null;
    this.questBanner = null;
    this.chapterBanner = null;
    this.chapterNumber = null;
    this.chapterTitle = null;
    this.chapterSubtitle = null;

    this.starCount = 0;
    this.totalStars = 5;

    this.createDOM();
  }

  createDOM() {
    this.element = document.createElement('div');
    this.element.className = 'fop-hud';
    this.element.innerHTML = `
      <div class="hud-star-counter" title="Memory Stars collected">
        <div class="hud-star-icon"></div>
        <span class="hud-star-text">0 / 5</span>
      </div>

      <div class="hud-quest-banner">
        <div class="hud-quest-title">Prologue</div>
        <div class="hud-quest-desc">Meet under the moonlight by the Torii gate</div>
      </div>

      <div class="hud-actions">
        <button class="hud-btn hud-sound-btn" title="Toggle Sound">♫</button>
        <button class="hud-btn hud-pause-btn" title="Pause Game">⏸</button>
      </div>
    `;

    this.starCountText = this.element.querySelector('.hud-star-text');
    this.questBanner = this.element.querySelector('.hud-quest-banner');
    this.questTitle = this.element.querySelector('.hud-quest-title');
    this.questDesc = this.element.querySelector('.hud-quest-desc');

    const soundBtn = this.element.querySelector('.hud-sound-btn');
    soundBtn.addEventListener('click', () => {
      SoundFX.ensureContext();
      SoundFX.setMute(!SoundFX.isMuted);
      soundBtn.textContent = SoundFX.isMuted ? '✕' : '♫';
      soundBtn.style.color = SoundFX.isMuted ? 'var(--c-pink-mid)' : 'var(--c-cream-light)';
    });

    const pauseBtn = this.element.querySelector('.hud-pause-btn');
    pauseBtn.addEventListener('click', () => {
      SoundFX.playClick();
      if (typeof this.onPauseClick === 'function') {
        this.onPauseClick();
      }
    });

    this.container.appendChild(this.element);

    // Create Chapter Announcement Overlay
    this.chapterBanner = document.createElement('div');
    this.chapterBanner.className = 'chapter-announcement';
    this.chapterBanner.innerHTML = `
      <div class="chapter-badge">CHAPTER I</div>
      <div class="chapter-title">The Meeting by the Torii Gate</div>
      <div class="chapter-subtitle">Where Our Stories Entwined</div>
    `;
    this.chapterNumber = this.chapterBanner.querySelector('.chapter-badge');
    this.chapterTitle = this.chapterBanner.querySelector('.chapter-title');
    this.chapterSubtitle = this.chapterBanner.querySelector('.chapter-subtitle');

    this.container.appendChild(this.chapterBanner);
  }

  setStars(count, total = 5) {
    this.starCount = count;
    this.totalStars = total;
    this.starCountText.textContent = `${this.starCount} / ${this.totalStars}`;
  }

  addStar(amount = 1) {
    this.starCount += amount;
    this.starCountText.textContent = `${this.starCount} / ${this.totalStars}`;
    SoundFX.playStarCollect();

    // Pulse animation
    const counter = this.element.querySelector('.hud-star-counter');
    counter.style.transform = 'scale(1.15)';
    counter.style.borderColor = 'var(--c-gold-mid)';
    setTimeout(() => {
      counter.style.transform = 'scale(1)';
      counter.style.borderColor = 'var(--c-lavender-mid)';
    }, 300);
  }

  setQuest(title, description) {
    this.questTitle.textContent = title;
    this.questDesc.textContent = description;
    
    // Banner glow bounce
    this.questBanner.style.transform = 'scale(1.05)';
    this.questBanner.style.borderColor = 'var(--c-pink-light)';
    setTimeout(() => {
      this.questBanner.style.transform = 'scale(1)';
      this.questBanner.style.borderColor = 'var(--c-gold-mid)';
    }, 400);
  }

  showChapterTransition({ chapterNumber, title, subtitle, duration = 3500 }) {
    this.chapterNumber.textContent = `CHAPTER ${chapterNumber}`;
    this.chapterTitle.textContent = title;
    this.chapterSubtitle.textContent = subtitle;

    this.chapterBanner.classList.add('active');
    SoundFX.playQuestComplete();

    setTimeout(() => {
      this.chapterBanner.classList.remove('active');
    }, duration);
  }

  show() {
    this.element.style.display = 'flex';
  }

  hide() {
    this.element.style.display = 'none';
  }
}
