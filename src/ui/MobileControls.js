// On-Screen Virtual Mobile Controls for FOP!
// Touch & pointer friendly D-Pad and A/B action buttons

export class MobileControls {
  constructor(container, onMove, onAction) {
    this.container = container;
    this.onMove = onMove;
    this.onAction = onAction;
    this.element = null;
    this.activeDir = { x: 0, y: 0 };
    this.isEnabled = true;

    this.createDOM();
    this.bindEvents();
  }

  createDOM() {
    this.element = document.createElement('div');
    this.element.className = 'mobile-controls-layer';
    this.element.innerHTML = `
      <div class="mobile-dpad">
        <button class="dpad-btn dpad-up" data-dir="up">▲</button>
        <button class="dpad-btn dpad-down" data-dir="down">▼</button>
        <button class="dpad-btn dpad-left" data-dir="left">◀</button>
        <button class="dpad-btn dpad-right" data-dir="right">▶</button>
        <div class="dpad-center"></div>
      </div>

      <div class="mobile-action-group">
        <button class="action-btn action-btn-b" data-action="B" title="Run / Cancel">B</button>
        <button class="action-btn action-btn-a" data-action="A" title="Interact / Talk">A</button>
      </div>
    `;

    this.container.appendChild(this.element);
  }

  bindEvents() {
    // D-Pad buttons
    const dpadButtons = this.element.querySelectorAll('.dpad-btn');
    dpadButtons.forEach(btn => {
      const dir = btn.dataset.dir;

      const startMove = (e) => {
        e.preventDefault();
        if (dir === 'up') this.activeDir = { x: 0, y: -1 };
        else if (dir === 'down') this.activeDir = { x: 0, y: 1 };
        else if (dir === 'left') this.activeDir = { x: -1, y: 0 };
        else if (dir === 'right') this.activeDir = { x: 1, y: 0 };

        this.triggerMove();
      };

      const endMove = (e) => {
        e.preventDefault();
        this.activeDir = { x: 0, y: 0 };
        this.triggerMove();
      };

      btn.addEventListener('pointerdown', startMove);
      btn.addEventListener('pointerup', endMove);
      btn.addEventListener('pointercancel', endMove);
      btn.addEventListener('pointerleave', endMove);
    });

    // Action buttons (A and B)
    const actionButtons = this.element.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
      const action = btn.dataset.action;

      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        if (typeof this.onAction === 'function') {
          this.onAction(action);
        }
        if (window.GameEvents && typeof window.GameEvents.emit === 'function') {
          window.GameEvents.emit('input:action', { button: action });
        }
      });
    });
  }

  triggerMove() {
    if (typeof this.onMove === 'function') {
      this.onMove(this.activeDir);
    }
    if (window.GameEvents && typeof window.GameEvents.emit === 'function') {
      window.GameEvents.emit('input:move', this.activeDir);
    }
  }

  show() {
    this.element.style.display = 'flex';
  }

  hide() {
    this.element.style.display = 'none';
  }

  toggle(visible) {
    this.element.style.display = visible ? 'flex' : 'none';
  }
}
