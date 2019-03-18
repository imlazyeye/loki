var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Init
import * as Engine from './loki.js';
function gameInitialize() {
    return __awaiter(this, void 0, void 0, function* () {
        // Boot up Loki
        console.log('Initializing...');
        const core = new Engine.Core('main', 60);
        // Load in assets
        console.log('Loading assets...');
        const playerSpr = yield Engine.Sprite.create('Player', 'assets/sprites/sprPlayer.png');
        // Add a sprite to the batch
        core.drawSprite(playerSpr, 0, 0);
        // Begin the updates
        core.update();
    });
}
window.onload = gameInitialize;
