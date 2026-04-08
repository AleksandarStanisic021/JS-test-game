export class CollisionSystem {
  checkCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  checkMissileEnemyCollision(missiles, enemies) {
    for (let i = missiles.length - 1; i >= 0; i--) {
      for (let j = enemies.length - 1; j >= 0; j--) {
        if (this.checkCollision(missiles[i], enemies[j])) {
          return { missileIndex: i, enemyIndex: j };
        }
      }
    }
    return null;
  }

  checkPlayerEnemyCollision(player, enemies) {
    for (let i = 0; i < enemies.length; i++) {
      if (this.checkCollision(player, enemies[i])) {
        return true;
      }
    }
    return false;
  }
}
