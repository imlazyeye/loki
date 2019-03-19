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
        // Define sprites
        const playerSpr = yield Engine.Sprite.create('assets/sprites/sprPlayer.png');
        const treeSpr = yield Engine.Sprite.create('assets/sprites/sprTree.png');
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
            constructor() {
                super(...arguments);
                this.sprite = treeSpr;
            }
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
    });
}
window.onload = gameInitialize;
