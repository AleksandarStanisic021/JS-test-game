import { TILE_SIZE } from "../constants.js";

export class RenderSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
  }
  render(player) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#270330";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderGrid();
    this.renderPlayer(player);
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
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(player.x, player.y, player.width, player.height);
  }
}
