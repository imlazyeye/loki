// Init
import * as Engine from './loki.js';
async function gameInitialize() {

  // Boot up Loki
  console.log('Initializing...');
  const core = new Engine.Core('main', 60);

  // Load in assets
  console.log('Loading assets...');
  
  // Define sprites
  const playerSpr = await Engine.Sprite.create('assets/sprites/sprPlayer.png');
  const treeSpr = await Engine.Sprite.create('assets/sprites/sprTree.png');

  // Define the player
  class Player extends Engine.Entity {
    initiate() {
      this.sprite = playerSpr;
    }
    update() {
      this.y += 0.5;
      this.x += 0.5;
      this.depth = -this.y;
    }
  }
  const player = new Player(50);

  // Define a tree
  class Tree extends Engine.Entity {
    sprite = treeSpr;
    update() {
      this.depth = this.y;
    }
  }
  for (let i = 0; i < 50; ++i) {
    let x = Math.random() * Math.floor(300);
    let y = Math.random() * Math.floor(300);
    new Tree(x, y);
  }

  // Begin the updates
  core.update();
}

window.onload = gameInitialize;