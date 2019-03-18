// Main game class
namespace Loki {
	static class Main {
		public scale: number;
		private target: HTMLCanvasElement | null;
		private context: CanvasRenderingContext2D | null;
		private timeStamp: number;
		private frameRate: number;
		public core: object;
		public assets: object;

		// Init function
		constructor(canvas: string, frameRate: number) {

			// Reference
			let main: Main = this;

			// Properties
			this.scale = 8;
			this.target = <HTMLCanvasElement> document.getElementById(canvas);
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


			// Core
			this.core = {
				coreUpdate() {
					let time = new Date().getTime();
					if (time - main.timeStamp >= main.frameRate) {
						main.timeStamp = time;
					}
					window.requestAnimationFrame(this.coreUpdate.bind(this));
				}
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
	}

	// Interface
	public interface Bbox {
    left: number;
    right: number;
    top: number;
    bottom: number;
	}

	// Classes
	class Sprite {
		
		// Properties
		public name: string;
		public asset: HTMLImageElement;
		public loaded: boolean;
		public width: number;
		public height: number;
		public bounds: Bbox;

		// Methods
		private constructor(name: string) {
			this.name = name;
			this.asset = new Image();
			this.loaded = false;
			this.width = 0;
			this.height = 0;
			this.bounds = {
				left = 0,
				top = 0,
				right = 0,
				bottom = 0
			}
		}
		public static CreateSprite(spriteList: Sprite[], name: string, path: string) {
			const mySprite = new Sprite(name);
			spriteList.push(mySprite);
		}
		public static async LoadImage(path: string) {
			return new Promise(resolve => {
				this.asset.src = path;
				this.asset.onload = () => {
					console.log(`Succesfully loaded image from ${path}`)
					this.loaded = true;
					this.width = this.width;
					this.height = this.height;
					Loki.Main.assets.sprites[this.name] = this;
					resolve(this);
				}
			});
		}
	}

	class Object {

		// Properties
		spriteIndex = undefined;
		init = undefined;
		update = undefined;
		render = undefined;
		x = 0;
		y = 0;

		// Methods
	}

	drawSprite(name: string, x: number, y: number) {
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