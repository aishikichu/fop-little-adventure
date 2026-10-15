// Rich Cozy Dialogue Box for FOP!
import { SoundFX } from './SoundFX.js';

export class DialogueBox {
  constructor(container) {
    this.container = container;
    this.element = null;
    this.portraitImg = null;
    this.nameplate = null;
    this.textField = null;
    this.choicesContainer = null;
    this.continuePrompt = null;
    
    this.currentText = '';
    this.typewriterIndex = 0;
    this.typewriterTimer = null;
    this.isTyping = false;
    this.currentOptions = null;
    this.onCompleteCallback = null;
    this.isOpen = false;
    
    this.createDOM();
    this.bindEvents();
  }

  createDOM() {
    this.element = document.createElement('div');
    this.element.className = 'dialogue-overlay';
    this.element.style.display = 'none';

    this.element.innerHTML = `
      <div class="dialogue-box-frame">
        <div class="dialogue-portrait-wrap">
          <img class="dialogue-portrait-img" src="/assets/characters/companion/portraits/neutral.png" alt="Portrait" />
        </div>
        <div class="dialogue-content">
          <div class="dialogue-nameplate speaker-companion">Companion</div>
          <div class="dialogue-text"></div>
          <div class="dialogue-choices"></div>
          <div class="dialogue-continue-prompt">
            <span>Press Space or Tap to continue</span>
            <span class="dialogue-continue-arrow">▼</span>
          </div>
        </div>
      </div>
    `;

    this.portraitImg = this.element.querySelector('.dialogue-portrait-img');
    this.nameplate = this.element.querySelector('.dialogue-nameplate');
    this.textField = this.element.querySelector('.dialogue-text');
    this.choicesContainer = this.element.querySelector('.dialogue-choices');
    this.continuePrompt = this.element.querySelector('.dialogue-continue-prompt');

    this.container.appendChild(this.element);
  }

  bindEvents() {
    this.element.addEventListener('click', (e) => {
      // If clicking choice buttons, let choice handler manage it
      if (e.target.closest('.dialogue-choice-btn')) return;
      this.advance();
    });

    window.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        this.advance();
      } else if (['Digit1', 'Digit2', 'Digit3', 'Digit4'].includes(e.code)) {
        const idx = parseInt(e.key, 10) - 1;
        this.selectChoice(idx);
      }
    });
  }

  show(options) {
    this.currentOptions = options;
    this.isOpen = true;
    this.element.style.display = 'block';

    const char = (options.character || 'companion').toLowerCase();
    const speaker = options.speaker || (char === 'player' ? 'Player' : 'Companion');
    const emote = options.portrait || options.emote || 'neutral';

    // Update nameplate
    this.nameplate.textContent = speaker;
    this.nameplate.className = `dialogue-nameplate speaker-${char}`;

    // Update portrait
    const portraitPath = `/assets/characters/${char}/portraits/${emote}.png`;
    this.portraitImg.src = portraitPath;

    // Reset choices & prompt
    this.choicesContainer.innerHTML = '';
    this.continuePrompt.style.visibility = 'hidden';

    // Start typewriter
    this.currentText = options.text || '';
    this.typewriterIndex = 0;
    this.textField.textContent = '';
    this.isTyping = true;
    this.onCompleteCallback = options.onComplete || null;

    if (this.typewriterTimer) clearInterval(this.typewriterTimer);

    const speed = options.speed || 28;
    this.typewriterTimer = setInterval(() => {
      if (this.typewriterIndex < this.currentText.length) {
        this.textField.textContent += this.currentText[this.typewriterIndex];
        
        // Voice blip on non-space characters every 2-3 characters
        if (this.currentText[this.typewriterIndex] !== ' ' && this.typewriterIndex % 2 === 0) {
          SoundFX.playDialogueBlip(char);
        }
        
        this.typewriterIndex++;
      } else {
        this.finishTyping();
      }
    }, speed);
  }

  finishTyping() {
    clearInterval(this.typewriterTimer);
    this.typewriterTimer = null;
    this.textField.textContent = this.currentText;
    this.isTyping = false;

    // Display choices if provided
    if (this.currentOptions && this.currentOptions.choices && this.currentOptions.choices.length > 0) {
      this.continuePrompt.style.visibility = 'hidden';
      this.renderChoices(this.currentOptions.choices);
    } else {
      this.continuePrompt.style.visibility = 'visible';
    }
  }

  renderChoices(choices) {
    this.choicesContainer.innerHTML = '';
    choices.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.className = 'dialogue-choice-btn';
      btn.innerHTML = `<span style="font-family: var(--font-pixel-label); color: var(--c-gold-light); margin-right: 4px;">[${index + 1}]</span> ${choice.text}`;
      btn.addEventListener('click', () => {
        this.selectChoice(index);
      });
      this.choicesContainer.appendChild(btn);
    });
  }

  selectChoice(index) {
    if (!this.currentOptions || !this.currentOptions.choices) return;
    const choice = this.currentOptions.choices[index];
    if (choice) {
      SoundFX.playClick();
      if (typeof this.currentOptions.onChoice === 'function') {
        this.currentOptions.onChoice(index, choice);
      }
      this.hide();
    }
  }

  advance() {
    if (this.isTyping) {
      // Fast forward to end of current line
      this.finishTyping();
    } else {
      // If waiting for choice selection, don't dismiss immediately
      if (this.currentOptions && this.currentOptions.choices && this.currentOptions.choices.length > 0) {
        return;
      }
      SoundFX.playClick();
      this.hide();
      if (typeof this.onCompleteCallback === 'function') {
        this.onCompleteCallback();
      }
    }
  }

  hide() {
    this.isOpen = false;
    this.element.style.display = 'none';
    if (this.typewriterTimer) clearInterval(this.typewriterTimer);
  }
}
