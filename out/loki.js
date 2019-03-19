var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Main class
export class Core {
    // Init function
    constructor(canvas, frameRate) {
        // Properties
        this.scale = 3;
        this.target = document.getElementById(canvas);
        this.context = null;
        if (this.target != null) {
            this.context = this.target.getContext("2d");
        }
        if (this.context != null) {
            this.context.scale(this.scale, this.scale);
            this.context.imageSmoothingEnabled = false;
        }
        this.timeStamp = new Date().getTime();
        this.frameRate = 1000 / frameRate;
        // Finished!
        console.log('Loki has been initialized!');
    }
    // Methods
    update() {
        let time = new Date().getTime();
        if (time - this.timeStamp >= this.frameRate) {
            // Updates
            Entity.activeList.forEach(instance => {
                instance.update();
            });
            // Depth sort
            function compare(a, b) {
                if (a.depth > b.depth) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
            Entity.activeList.sort(compare);
            // Render submissions
            Entity.activeList.forEach(instance => {
                instance.render();
            });
            // Render
            if (this.context != null && this.target != null) {
                this.timeStamp = time;
                // Clear the canvas
                this.context.clearRect(0, 0, this.target.width, this.target.height);
                // Draw all batch orders
                Core.batch.forEach(submission => {
                    this.drawSprite(submission.sprite, submission.x, submission.y);
                });
                // Empty the array
                Core.batch = [];
            }
        }
        window.requestAnimationFrame(this.update.bind(this));
    }
    drawSprite(sprite, x, y) {
        if (this.context != null) {
            this.context.drawImage(sprite.asset, x, y);
        }
    }
}
Core.batch = [];
// Classes
export class Render {
    static submitSprite(sprite, x, y) {
        Core.batch.push({ sprite, x, y });
    }
}
export class Sprite {
    // Methods
    constructor() {
        this.asset = new Image();
        this.loaded = false;
        this.width = 0;
        this.height = 0;
        this.bounds = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
    }
    static create(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const mySprite = new Sprite();
            yield mySprite.loadImage(path);
            return mySprite;
        });
    }
    loadImage(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.asset.src = path;
                this.asset.onload = () => {
                    console.log(`Succesfully loaded image from ${path}`);
                    this.loaded = true;
                    this.width = this.width;
                    this.height = this.height;
                    resolve(this);
                };
            });
        });
    }
}
export class Entity {
    // Internal
    constructor(x = 0, y = 0) {
        this.sprite = null;
        this.x = x;
        this.y = y;
        this.depth = 0;
        Entity.activeList.push(this);
        this.initiate();
    }
    // Methods
    initiate() { }
    ;
    update() { }
    ;
    render() {
        this.drawSelf();
    }
    drawSelf() {
        if (this.sprite != null) {
            Render.submitSprite(this.sprite, this.x, this.y);
        }
    }
}
// Properties
Entity.activeList = [];
