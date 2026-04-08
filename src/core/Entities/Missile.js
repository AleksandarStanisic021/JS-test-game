export class Missile {
  constructor(x, y, targetX, targetY) {
    this.x = x;
    this.y = y;
    this.width = 8;
    this.height = 8;
    this.color = "#ffff00";
    this.speed = 8;

    // Calculate direction to target
    const dx = targetX - x;
    const dy = targetY - y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Normalize direction
    this.dirX = distance > 0 ? dx / distance : 0;
    this.dirY = distance > 0 ? dy / distance : 0;
  }

  update() {
    this.x += this.dirX * this.speed;
    this.y += this.dirY * this.speed;
  }

  isOffScreen(canvasWidth, canvasHeight) {
    return (
      this.x < 0 || this.x > canvasWidth || this.y < 0 || this.y > canvasHeight
    );
  }
}
