export class Player {
  constructor(assetManager) {
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;
    this.width = 64;
    this.height = 64;
    this.assetManager = assetManager;
    this.sprite = assetManager.getImage("player");
  }

  updateSprite() {
    this.sprite = this.assetManager.getImage("player");
  }
}
