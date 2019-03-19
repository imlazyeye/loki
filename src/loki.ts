
// Interfaces
export interface bbox {
	left: number;
	right: number;
	top: number;
	bottom: number;
}
export interface batchSubmission {
	sprite: Sprite,
	x: number,
	y: number
}

// Main class
export class Core {
	public scale: number;
	private target: HTMLCanvasElement | null;
	private context: CanvasRenderingContext2D | null;
	private timeStamp: number;
	private frameRate: number;
	public static batch: batchSubmission[] = [];

	// Init function
	constructor(canvas: string, frameRate: number) {

		// Properties
		this.scale = 3;
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
			function compare(a: Entity, b: Entity) {
				if (a.depth > b.depth) {
					return 1;
				} else {
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
	drawSprite(sprite: Sprite, x: number, y: number) {
		if (this.context != null) {
			this.context.drawImage(sprite.asset, x, y);
		}
	}
}

// Classes
export class Render {
	static submitSprite(sprite: Sprite, x: number, y: number) {
		Core.batch.push({sprite, x, y})
	}
}
export class Sprite {
	
	// Properties
	public asset: HTMLImageElement;
	public loaded: boolean;
	public width: number;
	public height: number;
	public bounds: bbox;

	// Methods
	private constructor() {
		this.asset = new Image();
		this.loaded = false;
		this.width = 0;
		this.height = 0;
		this.bounds = {
			left: 0,
			top: 0,
			right: 0,
			bottom: 0
		}
	}

	public static async create(path: string) {
		const mySprite = new Sprite();
		await mySprite.loadImage(path);
		return mySprite;
	}
	
	public async loadImage(path: string) {
		return new Promise(resolve => {
			this.asset.src = path;
			this.asset.onload = () => {
				console.log(`Succesfully loaded image from ${path}`)
				this.loaded = true;
				this.width = this.width;
				this.height = this.height;
				resolve(this);
			}
		});
	}
}

export abstract class Entity {

	// Properties
	public static activeList: Entity[] = [];
	public sprite: Sprite | null;
	public x: number;
	public y: number;
	public depth: number;

	// Internal
	constructor(x: number = 0, y: number = 0) {
		this.sprite = null;
		this.x = x;
		this.y = y;
		this.depth = 0;
		Entity.activeList.push(this);
		this.initiate();
	}
	

	// Methods
	initiate() {};
	update() {};
	render() {
		this.drawSelf();
	}

	public drawSelf() {
		if (this.sprite != null) {
			Render.submitSprite(this.sprite, this.x, this.y);
		}
	}
}