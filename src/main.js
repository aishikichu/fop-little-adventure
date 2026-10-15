import Phaser from 'phaser';
import { Adventure } from './game/Adventure.js';
import { installDesignerUI } from './ui/GameUI.js';
import './ui/styles/gameUI.css';
import './game/designerBridge.js';

// Activate Designer UI
installDesignerUI();

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: 400,
  height: 225,
  pixelArt: true,
  roundPixels: true,
  backgroundColor: '#191a31',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: [Adventure]
});
