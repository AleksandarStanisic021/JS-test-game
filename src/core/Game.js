import { RenderSystem } from "./systems/RenderSystem";
import { InputSystem } from "./systems/InputSystem";
import { AISystem } from "./systems/AISystem";
import { EnemySpawner } from "./systems/EnemySpawner";
import { CollisionSystem } from "./systems/CollisionSystem";
import { AssetManager } from "./systems/AssetManager";
import { Player } from "./Entities/Player";
import { Enemy } from "./Entities/Enemy";
import { Missile } from "./Entities/Missile";
export class Game {
  constructor() {
    console.log("🎮 Game constructor called");
    this.canvas = document.createElement("canvas");
    //this.ctx = this.canvas.getContext("2d");
    this.assetManager = new AssetManager();
    this.renderSystem = new RenderSystem(this.canvas);
    this.inputSystem = new InputSystem(this);
    this.aiSystem = new AISystem();
    this.player = new Player(this.assetManager);
    this.enemySpawner = new EnemySpawner(
      this.canvas,
      this.assetManager,
      this.player,
    );
    this.collisionSystem = new CollisionSystem();
    this.missiles = [];
    this.score = 0;
    this.gameOver = false;
    console.log("🎮 Game object created, calling init()");
    this.init();
  }
  init() {
    console.log("🎮 Game init() called");
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
    document.body.appendChild(this.canvas);
    console.log("🎮 Canvas added to body, starting asset loading");

    // Start background music when assets are loaded
    this.assetManager
      .loadAssets()
      .then(() => {
        console.log("🎮 Assets loaded, updating sprites and starting music");
        this.assetManager.playBackgroundMusic();
        this.player.updateSprite();
        // Update existing enemies with sprites
        this.enemySpawner.enemies.forEach((enemy) => enemy.updateSprite());
        console.log("🎮 Starting game loop");
        requestAnimationFrame((t) => this.gameLoop(t));
      })
      .catch((error) => {
        console.error("❌ Failed to load assets:", error);
        // Start game anyway with fallbacks
        requestAnimationFrame((t) => this.gameLoop(t));
      });
  }
  resizeCanvas() {
    this.canvas.width = window.innerWidth - 20;
    this.canvas.height = window.innerHeight - 20;
  }

  createMissile(clickX, clickY) {
    if (this.gameOver) return;
    const missile = new Missile(
      this.player.x + this.player.width / 2,
      this.player.y + this.player.height / 2,
      clickX,
      clickY,
    );
    this.missiles.push(missile);
    this.assetManager.playSound("shoot");
  }

  restart() {
    this.player.x = window.innerWidth / 2;
    this.player.y = window.innerHeight / 2;
    this.missiles = [];
    this.score = 0;
    this.gameOver = false;
    this.enemySpawner.clear();
    this.assetManager.playBackgroundMusic();
  }

  gameLoop(timestamp) {
    console.log(
      "🎮 Game loop running, gameOver:",
      this.gameOver,
      "enemies:",
      this.enemySpawner.enemies.length,
    );
    if (this.gameOver) {
      this.renderSystem.render(
        this.player,
        this.enemySpawner.enemies,
        this.missiles,
        this.score,
        this.gameOver,
      );
      requestAnimationFrame((t) => this.gameLoop(t));
      return;
    }

    this.inputSystem.update(this.player);
    this.enemySpawner.update();

    // Update all enemies with AI
    this.enemySpawner.enemies.forEach((enemy) => {
      this.aiSystem.update(enemy, this.player);
    });

    // Update missiles
    for (let i = this.missiles.length - 1; i >= 0; i--) {
      this.missiles[i].update();
      if (this.missiles[i].isOffScreen(this.canvas.width, this.canvas.height)) {
        this.missiles.splice(i, 1);
      }
    }

    // Check collision between missile and enemies
    const collision = this.collisionSystem.checkMissileEnemyCollision(
      this.missiles,
      this.enemySpawner.enemies,
    );
    if (collision) {
      this.missiles.splice(collision.missileIndex, 1);
      this.enemySpawner.removeEnemy(collision.enemyIndex);
      this.score += 10;
      this.assetManager.playSound("enemy_death");
    }

    // Check collision between player and enemies
    if (
      this.collisionSystem.checkPlayerEnemyCollision(
        this.player,
        this.enemySpawner.enemies,
      )
    ) {
      this.gameOver = true;
      this.assetManager.playSound("game_over");
      this.assetManager.stopBackgroundMusic();
    }

    this.renderSystem.render(
      this.player,
      this.enemySpawner.enemies,
      this.missiles,
      this.score,
      this.gameOver,
    );
    requestAnimationFrame((t) => this.gameLoop(t));
  }
}
