// Master UI Controller & Event Bridge for FOP!
import { DialogueBox } from './DialogueBox.js';
import { HUD } from './HUD.js';
import { MainMenu } from './MainMenu.js';
import { PauseMenu } from './PauseMenu.js';
import { MobileControls } from './MobileControls.js';
import { EndingScreen } from './EndingScreen.js';
import { VFXManager } from './VFXManager.js';
import { SoundFX } from './SoundFX.js';

class SimpleEventBus {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

  emit(event, data) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(cb => {
      try {
        cb(data);
      } catch (err) {
        console.error(`Error in event listener for ${event}:`, err);
      }
    });
  }
}

export class UIController {
  constructor(rootContainer) {
    this.container = rootContainer || document.getElementById('game-ui-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'game-ui-container';
      document.body.appendChild(this.container);
    }

    // Initialize Global Event Bus
    if (!window.GameEvents) {
      window.GameEvents = new SimpleEventBus();
    }
    this.events = window.GameEvents;

    // Create Ambient VFX Canvas
    let vfxCanvas = document.getElementById('ambient-vfx-canvas');
    if (!vfxCanvas) {
      vfxCanvas = document.createElement('canvas');
      vfxCanvas.id = 'ambient-vfx-canvas';
      document.body.insertBefore(vfxCanvas, document.body.firstChild);
    }
    this.vfx = new VFXManager(vfxCanvas);
    this.vfx.start();

    // Initialize UI Components
    this.dialogue = new DialogueBox(this.container);
    this.hud = new HUD(this.container, () => this.pauseMenu.open());
    this.pauseMenu = new PauseMenu(
      this.container,
      () => this.events.emit('game:resume'),
      () => this.events.emit('chapter:restart'),
      () => {
        this.mainMenu.show();
        this.hud.hide();
        this.mobileControls.hide();
        this.events.emit('game:exit_to_menu');
      }
    );
    this.mobileControls = new MobileControls(
      this.container,
      (dir) => this.events.emit('input:move', dir),
      (action) => this.events.emit('input:action', { button: action })
    );
    this.ending = new EndingScreen(this.container, () => {
      this.mainMenu.show();
      this.hud.hide();
      this.events.emit('game:restart');
    });

    this.mainMenu = new MainMenu(this.container, () => {
      this.hud.show();
      this.mobileControls.show();
      this.events.emit('game:start');
    });

    this.bindBusEvents();
  }

  bindBusEvents() {
    // 1. Dialogue events
    this.events.on('dialogue:show', (opts) => this.dialogue.show(opts));
    this.events.on('dialogue:close', () => this.dialogue.hide());

    // 2. Quest & Stars
    this.events.on('quest:set', ({ title, objective }) => this.hud.setQuest(title, objective));
    this.events.on('star:add', ({ amount, count, total }) => {
      if (typeof count === 'number') {
        this.hud.setStars(count, total);
      } else {
        this.hud.addStar(amount || 1);
      }
    });

    // 3. Chapter transitions
    this.events.on('chapter:transition', (data) => this.hud.showChapterTransition(data));

    // 4. Ending screen
    this.events.on('ending:show', (data) => this.ending.show(data));

    // 5. VFX Mode
    this.events.on('vfx:mode', (mode) => this.vfx.setMode(mode));

    // 6. Sound controls
    this.events.on('audio:mute', (mute) => SoundFX.setMute(mute));
    this.events.on('audio:sfx', (vol) => SoundFX.setSFXVolume(vol));
    this.events.on('audio:bgm', (vol) => SoundFX.setBGMVolume(vol));
  }
}
