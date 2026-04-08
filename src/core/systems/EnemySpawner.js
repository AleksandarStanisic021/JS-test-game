import { Enemy } from "../Entities/Enemy.js";

export class EnemySpawner {
  constructor(canvas, assetManager, player) {
    this.canvas = canvas;
    this.assetManager = assetManager;
    this.player = player;
    this.colors = ["#ff0000", "#ff00ff", "#00ffff", "#ffff00", "#ff8800"];
    this.spawnInterval = 2000; // 2 seconds
    this.lastSpawnTime = Date.now();
    this.enemies = [];
    this.minSpawnDistance = 150; // Minimum distance from player in pixels
  }

  update() {
    const currentTime = Date.now();
    if (currentTime - this.lastSpawnTime > this.spawnInterval) {
      this.spawnEnemy();
      this.lastSpawnTime = currentTime;
    }

    // Update all enemies
    this.enemies.forEach((enemy) => {});
  }

  spawnEnemy() {
    const randomColor =
      this.colors[Math.floor(Math.random() * this.colors.length)];

    let x,
      y,
      attempts = 0;
    const maxAttempts = 50; // Prevent infinite loop

    do {
      x = Math.random() * (this.canvas.width - 64);
      y = Math.random() * (this.canvas.height - 64);
      attempts++;
    } while (this.isTooCloseToPlayer(x, y) && attempts < maxAttempts);

    // If we couldn't find a good spot after max attempts, just spawn anyway
    const enemy = new Enemy(x, y, randomColor, this.assetManager);
    this.enemies.push(enemy);
  }

  isTooCloseToPlayer(x, y) {
    if (!this.player) return false;

    const dx = x - this.player.x;
    const dy = y - this.player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < this.minSpawnDistance;
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
