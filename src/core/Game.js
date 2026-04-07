import { RenderSystem } from "./systems/RenderSystem";
import { Player } from "./Entities/Player";
export class Game {
  constructor() {
    this.canvas = document.createElement("canvas");
    //this.ctx = this.canvas.getContext("2d");
    this.renderSystem = new RenderSystem(this.canvas);
    this.player = new Player();
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
    this.renderSystem.render(this.player);
    requestAnimationFrame((t) => this.gameLoop(t));
  }
}
