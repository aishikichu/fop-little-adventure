// Ambient Visual Effects (VFX) Engine for FOP!
// Lightweight Canvas particles: Fireflies, Falling Sakura Petals, and Stardust

export class VFXManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.petals = [];
    this.mode = 'fireflies'; // 'fireflies' | 'petals' | 'stars' | 'all'
    this.isRunning = false;
    this.rafId = null;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.initParticles();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  initParticles() {
    this.particles = [];
    // 28 glowing fireflies
    for (let i = 0; i < 28; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: 1.5 + Math.random() * 2,
        baseAlpha: 0.3 + Math.random() * 0.6,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseOffset: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.2 - Math.random() * 0.4,
        hue: Math.random() > 0.4 ? 48 : 85 // Warm golden vs soft yellow-green
      });
    }

    // 24 drifting cherry blossom petals
    this.petals = [];
    for (let i = 0; i < 24; i++) {
      this.petals.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: 3 + Math.random() * 4,
        angle: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.04,
        vx: 0.4 + Math.random() * 0.6,
        vy: 0.6 + Math.random() * 0.8,
        swaySpeed: 0.03 + Math.random() * 0.02,
        swayOffset: Math.random() * Math.PI * 2
      });
    }
  }

  setMode(mode) {
    this.mode = mode;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
  }

  stop() {
    this.isRunning = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  loop() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);
    const now = Date.now() * 0.001;

    // 1. Draw & Update Fireflies
    if (this.mode === 'fireflies' || this.mode === 'all') {
      this.particles.forEach(p => {
        p.x += p.vx + Math.sin(now + p.pulseOffset) * 0.2;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -10) p.x = this.width + 10;
        if (p.x > this.width + 10) p.x = -10;
        if (p.y < -10) p.y = this.height + 10;

        const alpha = Math.max(0.1, p.baseAlpha + Math.sin(now * 3 + p.pulseOffset) * 0.35);

        // Soft outer glow
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        this.ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${alpha * 0.25})`;
        this.ctx.fill();

        // Hot glowing center
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `hsla(${p.hue}, 100%, 85%, ${alpha})`;
        this.ctx.fill();
        this.ctx.restore();
      });
    }

    // 2. Draw & Update Sakura Petals
    if (this.mode === 'petals' || this.mode === 'all') {
      this.petals.forEach(pt => {
        pt.x += pt.vx + Math.sin(now * 2 + pt.swayOffset) * 0.5;
        pt.y += pt.vy;
        pt.angle += pt.vRot;

        if (pt.x > this.width + 10) pt.x = -10;
        if (pt.y > this.height + 10) pt.y = -10;

        this.ctx.save();
        this.ctx.translate(pt.x, pt.y);
        this.ctx.rotate(pt.angle);

        // Oval petal with slight point
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, pt.size, pt.size * 0.55, 0, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(255, 205, 220, 0.75)';
        this.ctx.fill();

        this.ctx.restore();
      });
    }

    this.rafId = requestAnimationFrame(() => this.loop());
  }
}
