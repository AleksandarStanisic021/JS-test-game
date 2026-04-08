import { TILE_SIZE } from "../constants.js";

export class RenderSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
  }
  render(player, enemies, missiles, score, gameOver) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#270330";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderGrid();
    this.renderPlayer(player);
    this.renderEnemies(enemies);
    this.renderMissiles(missiles);
    this.renderScore(score);

    if (gameOver) {
      this.renderGameOver();
    }
  }

  renderGrid() {
    this.ctx.strokeStyle = "#3a0e5c";
    this.ctx.lineWidth = 5;
    for (let i = 0; i < this.canvas.width; i += TILE_SIZE) {
      this.ctx.beginPath();
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, this.canvas.height);
      this.ctx.stroke();
    }
    for (let i = 0; i < this.canvas.height; i += TILE_SIZE) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(this.canvas.width, i);
      this.ctx.stroke();
    }
  }
  renderPlayer(player) {
    if (player.sprite) {
      this.ctx.drawImage(
        player.sprite,
        player.x,
        player.y,
        player.width,
        player.height,
      );
    } else {
      // Fallback to colored rectangle
      this.ctx.fillStyle = "blue";
      this.ctx.fillRect(player.x, player.y, player.width, player.height);
    }
  }

  renderEnemies(enemies) {
    enemies.forEach((enemy) => {
      if (enemy.sprite) {
        this.ctx.drawImage(
          enemy.sprite,
          enemy.x,
          enemy.y,
          enemy.width,
          enemy.height,
        );
      } else {
        // Fallback to colored rectangle
        this.ctx.fillStyle = enemy.color;
        this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
      }
    });
  }

  renderMissiles(missiles) {
    missiles.forEach((missile) => {
      this.ctx.fillStyle = missile.color;
      this.ctx.fillRect(missile.x, missile.y, missile.width, missile.height);
    });
  }

  renderScore(score) {
    this.ctx.fillStyle = "#00ff00";
    this.ctx.font = "24px Arial";
    this.ctx.fillText("Score: " + score, 20, 40);
  }

  renderGameOver() {
    // Semi-transparent overlay
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Game Over text
    this.ctx.fillStyle = "#ff0000";
    this.ctx.font = "bold 60px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "GAME OVER",
      this.canvas.width / 2,
      this.canvas.height / 2 - 50,
    );

    // Restart instructions
    this.ctx.fillStyle = "#00ff00";
    this.ctx.font = "24px Arial";
    this.ctx.fillText(
      "Click to Restart",
      this.canvas.width / 2,
      this.canvas.height / 2 + 40,
    );
    this.ctx.textAlign = "left";
  }
}
