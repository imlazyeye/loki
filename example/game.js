// Init
async function gameInitialize() {

  // Boot up Loki
  console.log('Initializing...');
  const engine = new Loki('main', 60);

  // Load in assets
  console.log('Loading assets...');
  let spr = new engine.Sprite();
  await spr.init('Player', 'assets/sprites/sprPlayer.png');

  // Add a sprite to the batch
  engine.drawSprite('Player', 0, 0);

  // Begin the updates
  engine.core.coreUpdate(); 
}

window.onload = gameInitialize;