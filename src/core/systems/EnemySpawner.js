import { Enemy } from "../Entities/Enemy.js";

export class EnemySpawner {
  constructor(canvas, assetManager, player) {
    this.canvas = canvas;
    this.assetManager = assetManager;
    this.player = player;
    this.colors = ["#ff0000", "#ff00ff", "#00ffff", "#ffff00", "#ff8800"];
    this.baseSpawnInterval = 5000; // Base interval between waves (5 seconds) - more relaxed
    this.spawnInterval = this.baseSpawnInterval;
    this.lastSpawnTime = Date.now();
    this.enemies = [];
    this.minSpawnDistance = 120; // Minimum distance from player in pixels
    this.waveNumber = 0;
    this.spawnBurstSize = 1; // Start with just 1 enemy per wave - much easier
  }

  update() {
    const currentTime = Date.now();
    if (currentTime - this.lastSpawnTime > this.spawnInterval) {
      this.spawnWave();
      this.lastSpawnTime = currentTime;
      this.waveNumber++;

      // Much slower difficulty progression - every 10 waves instead of 5
      if (this.waveNumber % 10 === 0) {
        this.spawnBurstSize = Math.min(this.spawnBurstSize + 1, 4); // Max 4 enemies per wave (was 8)
        this.spawnInterval = Math.max(
          this.baseSpawnInterval - this.waveNumber * 50,
          2000,
        ); // Min 2 seconds (was 1)
      }
    }

    // Update all enemies
    this.enemies.forEach((enemy) => {});
  }

  spawnWave() {
    // Spawn multiple enemies in a burst (Vampire Survivors style)
    for (let i = 0; i < this.spawnBurstSize; i++) {
      // Add slight delay between spawns in the same wave - slower for easier gameplay
      setTimeout(() => {
        this.spawnEnemy();
      }, i * 500); // 500ms delay between each enemy in the wave (was 200ms)
    }
  }

  spawnEnemy() {
    const randomColor =
      this.colors[Math.floor(Math.random() * this.colors.length)];

    // Vampire Survivors style: spawn around screen edges or in circle around player
    const spawnMethod = Math.random();

    let x, y;

    if (spawnMethod < 0.7) {
      // 70% chance: spawn on screen edges
      const side = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left

      switch (side) {
        case 0: // Top edge
          x = Math.random() * this.canvas.width;
          y = -32;
          break;
        case 1: // Right edge
          x = this.canvas.width + 32;
          y = Math.random() * this.canvas.height;
          break;
        case 2: // Bottom edge
          x = Math.random() * this.canvas.width;
          y = this.canvas.height + 32;
          break;
        case 3: // Left edge
          x = -32;
          y = Math.random() * this.canvas.height;
          break;
      }
    } else {
      // 30% chance: spawn in a circle around the player (but at safe distance)
      const angle = Math.random() * Math.PI * 2;
      const distance = this.minSpawnDistance + Math.random() * 100; // 120-220 pixels from player

      x = this.player.x + Math.cos(angle) * distance;
      y = this.player.y + Math.sin(angle) * distance;

      // Keep within canvas bounds
      x = Math.max(32, Math.min(this.canvas.width - 32, x));
      y = Math.max(32, Math.min(this.canvas.height - 32, y));
    }

    const enemy = new Enemy(x, y, randomColor, this.assetManager);
    this.enemies.push(enemy);
  }

  getEnemies() {
    return this.enemies;
  }

  removeEnemy(index) {
    if (index >= 0 && index < this.enemies.length) {
      this.enemies.splice(index, 1);
    }
  }

  clear() {
    this.enemies = [];
  }
}
