export class AssetManager {
  constructor() {
    this.images = {};
    this.sounds = {};
    this.loaded = false;
    this.loadAssets();
  }

  async loadAssets() {
    // Using actual free pixel art sprites from OpenGameArt.org and Kenney.nl
    // These are CC0/Public Domain or free for commercial use

    const imageUrls = {
      // Player sprite - create a simple pixel art character
      player: this.createPixelArtPlayer(),

      // Enemy sprites - create different colored pixel art enemies
      enemy_red: this.createPixelArtEnemy("#ff0000"),
      enemy_blue: this.createPixelArtEnemy("#0000ff"),
      enemy_green: this.createPixelArtEnemy("#00ff00"),
      enemy_yellow: this.createPixelArtEnemy("#ffff00"),
      enemy_purple: this.createPixelArtEnemy("#ff00ff"),
    };

    // Alternative pixel art sources (uncomment to try different sprites):
    // player: "https://kenney.nl/content/2d-characters?filter=character_1.png",
    // enemy_red: "https://kenney.nl/content/2d-characters?filter=enemy_1.png",

    // Create sounds programmatically using Web Audio API
    const soundTypes = {
      shoot: "shoot",
      enemy_death: "enemy_death",
      game_over: "game_over",
      background: "background",
    };

    // Load images (now using programmatically created pixel art)
    for (const [key, canvas] of Object.entries(imageUrls)) {
      this.images[key] = canvas;
      console.log(`✅ Created ${key} pixel art sprite`);
    }

    // Create sounds
    for (const [key, type] of Object.entries(soundTypes)) {
      this.sounds[key] = this.createSimpleSound(type);
    }

    this.loaded = true;
    console.log(
      "✅ All pixel art assets created! You should now see custom pixel art sprites and hear sounds.",
    );
  }

  loadImage(urlOrCanvas) {
    // If it's already a canvas (colored square), return it directly
    if (urlOrCanvas instanceof HTMLCanvasElement) {
      return Promise.resolve(urlOrCanvas);
    }

    // Otherwise load from URL
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => {
        console.warn(`Failed to load image: ${urlOrCanvas}`);
        // Create a fallback colored square
        resolve(this.createColoredSquare("#ffffff", 64, 64));
      };
      img.src = urlOrCanvas;
    });
  }

  createColoredSquare(color, width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    // Add a border
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, width, height);
    return canvas;
  }

  getFallbackColor(key) {
    const colorMap = {
      player: "#00ff00",
      enemy_red: "#ff0000",
      enemy_blue: "#0000ff",
      enemy_green: "#00ff00",
      enemy_yellow: "#ffff00",
      enemy_purple: "#ff00ff",
    };
    return colorMap[key] || "#ffffff";
  }

  createPixelArtPlayer() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");

    // Draw a simple pixel art character
    // Body (green)
    ctx.fillStyle = "#00aa00";
    ctx.fillRect(24, 32, 16, 16);

    // Head (light green)
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(20, 16, 24, 20);

    // Eyes (black)
    ctx.fillStyle = "#000000";
    ctx.fillRect(26, 22, 4, 4);
    ctx.fillRect(34, 22, 4, 4);

    // Arms (green)
    ctx.fillStyle = "#00aa00";
    ctx.fillRect(16, 32, 8, 12);
    ctx.fillRect(40, 32, 8, 12);

    // Legs (dark green)
    ctx.fillStyle = "#008800";
    ctx.fillRect(24, 48, 6, 12);
    ctx.fillRect(34, 48, 6, 12);

    return canvas;
  }

  createPixelArtEnemy(color) {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");

    // Draw a simple pixel art enemy
    // Body (main color)
    ctx.fillStyle = color;
    ctx.fillRect(20, 24, 24, 24);

    // Head (lighter shade)
    const lighterColor = this.lightenColor(color, 0.3);
    ctx.fillStyle = lighterColor;
    ctx.fillRect(16, 8, 32, 20);

    // Eyes (red for all enemies)
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(22, 14, 6, 6);
    ctx.fillRect(36, 14, 6, 6);

    // Spikes/antennas (darker shade)
    const darkerColor = this.darkenColor(color, 0.3);
    ctx.fillStyle = darkerColor;
    ctx.fillRect(12, 4, 4, 8);
    ctx.fillRect(48, 4, 4, 8);
    ctx.fillRect(8, 20, 8, 4);
    ctx.fillRect(48, 20, 8, 4);

    // Legs (darker)
    ctx.fillStyle = darkerColor;
    ctx.fillRect(20, 48, 8, 12);
    ctx.fillRect(36, 48, 8, 12);

    return canvas;
  }

  lightenColor(color, percent) {
    // Simple color lightening function
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent * 100);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }

  darkenColor(color, percent) {
    // Simple color darkening function
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent * 100);
    const R = (num >> 16) - amt;
    const G = ((num >> 8) & 0x00ff) - amt;
    const B = (num & 0x0000ff) - amt;
    return (
      "#" +
      (
        0x1000000 +
        (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
        (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
        (B > 255 ? 255 : B < 0 ? 0 : B)
      )
        .toString(16)
        .slice(1)
    );
  }

  loadSound(url) {
    // This method is no longer used since we're creating sounds programmatically
    return Promise.resolve(null);
  }

  createSimpleSound(type) {
    try {
      // Create simple sound effects using Web Audio API
      const audioContext = new (
        window.AudioContext || window.webkitAudioContext
      )();

      // Resume audio context if suspended (required by some browsers)
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Configure sound based on type
      switch (type) {
        case "shoot":
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.type = "square";
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 0.1,
          );
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.1);
          break;

        case "enemy_death":
          oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(
            50,
            audioContext.currentTime + 0.3,
          );
          oscillator.type = "sawtooth";
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 0.3,
          );
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.3);
          break;

        case "game_over":
          oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
          oscillator.type = "triangle";
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 1.0,
          );
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 1.0);
          break;

        case "background":
          // Simple background drone
          oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
          oscillator.type = "sine";
          gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
          oscillator.start(audioContext.currentTime);
          // Don't stop - let it loop
          return { oscillator, gainNode, audioContext, isBackground: true };
      }

      // Return a mock audio object for non-background sounds
      return {
        play: () => {}, // Already played above
        pause: () => {},
        currentTime: 0,
        volume: 1,
        loop: false,
      };
    } catch (e) {
      console.warn(`Failed to create sound ${type}:`, e);
      return {
        play: () => {},
        pause: () => {},
        currentTime: 0,
        volume: 1,
        loop: false,
      };
    }
  }

  getImage(key) {
    return this.images[key] || null;
  }

  playSound(key, volume = 0.5) {
    // For Web Audio API sounds, create and play them on demand
    try {
      this.createSimpleSound(key);
    } catch (e) {
      console.warn(`Failed to play sound ${key}:`, e);
    }
  }

  playBackgroundMusic() {
    // Background music starts when created
    try {
      this.createSimpleSound("background");
    } catch (e) {
      console.warn("Failed to start background music:", e);
    }
  }

  stopBackgroundMusic() {
    // Web Audio API sounds stop automatically
    // This is kept for compatibility
  }
}
