export class Game {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.init();
  }
  init() {
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
    document.body.appendChild(this.canvas);
    requestAnimationFrame((t) => this.gameLoop(t));
  }
  resizeCanvas() {
    this.canvas.width = window.innerWidth - 20;
    this.canvas.height = window.innerHeight - 20;
  }
  gameLoop(timestamp) {
    this.render();
    requestAnimationFrame((t) => this.gameLoop(t));
  }
  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#270330";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
