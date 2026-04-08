export class Enemy {
  constructor(x, y, color = "#ff0000", assetManager) {
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 64;
    this.color = color;
    this.assetManager = assetManager;
    this.spriteKey = this.getSpriteKeyFromColor(color);
    this.sprite = assetManager.getImage(this.spriteKey);
  }

  getSpriteKeyFromColor(color) {
    const colorMap = {
      "#ff0000": "enemy_red",
      "#0000ff": "enemy_blue",
      "#00ff00": "enemy_green",
      "#ffff00": "enemy_yellow",
      "#ff00ff": "enemy_purple",
    };
    return colorMap[color] || "enemy_red";
  }

  updateSprite() {
    this.sprite = this.assetManager.getImage(this.spriteKey);
  }
}
