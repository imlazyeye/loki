// Main game class
class Loki {

	// Init function
	constructor(canvas, frameRate) {

		// Reference
		let loki = this;

		// Properties
		this.scale = 8;
		this.target = document.getElementById(canvas);
		this.context = this.target.getContext("2d");
		this.context.scale(this.scale, this.scale);
		this.context.imageSmoothingEnabled = false;
		this.timeStamp = new Date().getTime();
		this.frameRate = 1000 / frameRate;


		// Core
		this.core = {
			coreUpdate() {
				let time = new Date().getTime();
				if (time - loki.timeStamp >= loki.frameRate) {
					loki.timeStamp = time;
				}
				window.requestAnimationFrame(this.coreUpdate.bind(this));
			}
		}

		// Classes
		this.Sprite = class {
			
			// Properties
			name = '';
			asset = new Image();
			loaded = false;
			width = 0;
			height = 0;
			bounds = [0, 0, 0, 0];

			// Methods
			async init(name, path) {
				return new Promise(resolve => {
					this.asset.src = path;
					this.name = name;
					this.asset.onload = () => {
						console.log(`Succesfully loaded image from ${path}`)
						this.loaded = true;
						this.width = this.width;
						this.height = this.height;
						loki.assets.sprites[this.name] = this;
						resolve(this);
					}
				});
			}
		}

		this.Object = class {

			// Properties
			spriteIndex = undefined;
			init = undefined;
			update = undefined;
			render = undefined;
			x = 0;
			y = 0;

			// Methods
		}

		// Asset Cache
		this.assets = {
			sprites: [

			],
			sounds: [

			]
		}

		// Finished!
		console.log('Loki has been initialized!');
	}

	drawSprite(name, x, y) {
		let thisSprite = this.assets.sprites[name];
		if (thisSprite == undefined) {
			throw `No sprite found with the name ${name}!`;
		}
		if (thisSprite.loaded == false) {
			throw `Sprite '${name}' not loaded for drawing!`
		}
		this.context.drawImage(thisSprite.asset, x, y);
	}
}