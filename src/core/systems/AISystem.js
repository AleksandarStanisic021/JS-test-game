export class AISystem {
  constructor() {
    this.speed = 3;
  }

  update(enemy, player) {
    // Calculate direction to player
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      // Normalize and move towards player
      const dirX = dx / distance;
      const dirY = dy / distance;

      enemy.x += dirX * this.speed;
      enemy.y += dirY * this.speed;
    }
  }

  setSpeed(speed) {
    this.speed = speed;
  }
}
