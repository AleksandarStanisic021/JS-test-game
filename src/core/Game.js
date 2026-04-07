export class Game {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
  }
  init() {
    this.resizeCanvas();
    document.body.appendChild(this.canvas);
  }
  resizeCanvas() {
    this.canvas.width = 150;
    this.canvas.height = 300;
  }
}
