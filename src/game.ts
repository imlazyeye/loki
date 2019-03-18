// Init
import * as Engine from './loki';
async function gameInitialize() {

  // Boot up Loki
  console.log('Initializing...');
  const core = new Engine.Core('main', 60);

  // Load in assets
  console.log('Loading assets...');
  
  const playerSpr = await Engine.Sprite.create('Player', 'assets/sprites/sprPlayer.png');

  // Add a sprite to the batch
  core.drawSprite(playerSpr, 0, 0);

  // Begin the updates
  core.update();
}

window.onload = gameInitialize;