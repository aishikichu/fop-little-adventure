import Phaser from 'phaser';
import { Adventure } from './game/Adventure.js';
import { installDesignerUI } from './ui/GameUI.js';
import './ui/styles/gameUI.css';
import './game/designerBridge.js';

// Activate Designer UI
installDesignerUI();

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: 400,
  height: 225,
  pixelArt: true,
  roundPixels: true,
  backgroundColor: '#191a31',
  scale: {
    mode: Phaser.Scale.FIT,
    // The flex container centers the canvas. Phaser margins would center it twice.
    autoCenter: Phaser.Scale.NO_CENTER
  },
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: [Adventure]
});

// Browser toolbars, orientation and wrapped HUD text can change the available area.
const app = document.getElementById('app');
const chapter = document.querySelector('.chapter');
const hudObserver = new ResizeObserver(() => {
  app.style.setProperty('--hud-bottom', `${chapter.getBoundingClientRect().bottom - app.getBoundingClientRect().top + 12}px`);
});
hudObserver.observe(chapter);
hudObserver.observe(document.querySelector('header'));
const gameObserver = new ResizeObserver(() => {
  if (game.isBooted) {
    game.scale.getParentBounds();
    game.scale.refresh();
  }
});
gameObserver.observe(document.getElementById('game'));
game.events.once('destroy', () => { hudObserver.disconnect(); gameObserver.disconnect(); });
