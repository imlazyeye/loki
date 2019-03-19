// Init
import * as Engine from './loki.js';
async function gameInitialize() {

  // Boot up Loki
  console.log('Initializing...');
  const core = new Engine.Core('main', 60);

  // Load in assets
  console.log('Loading assets...');
  
  // Define player sprite
  const playerSpr = await Engine.Sprite.create('Player', 'assets/sprites/sprPlayer.png');

  // Define the player
  class Player extends Engine.Entity {
    initiate() {
      this.sprite = playerSpr;
      this.x = 10;
      this.y = 50;
    }
    update() {
      this.x += 0.05;
    }
  }
  const player = new Player();
  player.initiate();

  // Begin the updates
  core.update();
}

window.onload = gameInitialize;