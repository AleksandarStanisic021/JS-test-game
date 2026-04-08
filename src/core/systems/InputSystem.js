export class InputSystem {
  constructor() {
    this.keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
      w: false,
      a: false,
      s: false,
      d: false,
    };
    this.speed = 5;
    this.init();
  }

  init() {
    window.addEventListener("keydown", (e) => this.handleKeyDown(e));
    window.addEventListener("keyup", (e) => this.handleKeyUp(e));
  }

  handleKeyDown(event) {
    const key = event.key;
    if (key in this.keys) {
      this.keys[key] = true;
      event.preventDefault();
    }
  }

  handleKeyUp(event) {
    const key = event.key;
    if (key in this.keys) {
      this.keys[key] = false;
      event.preventDefault();
    }
  }

  isMovingUp() {
    return this.keys.ArrowUp || this.keys.w;
  }

  isMovingDown() {
    return this.keys.ArrowDown || this.keys.s;
  }

  isMovingLeft() {
    return this.keys.ArrowLeft || this.keys.a;
  }

  isMovingRight() {
    return this.keys.ArrowRight || this.keys.d;
  }

  update(player) {
    if (this.isMovingUp()) {
      player.y -= this.speed;
    }
    if (this.isMovingDown()) {
      player.y += this.speed;
    }
    if (this.isMovingLeft()) {
      player.x -= this.speed;
    }
    if (this.isMovingRight()) {
      player.x += this.speed;
    }
  }

  setSpeed(speed) {
    this.speed = speed;
  }
}
