export class UI_BUTTON {
	constructor(scene, x, y, w, h, color, text, config = {}) {
		this.scene = scene;
		var backgroundWidth = 8;
		this.buttonBackground = scene.add.rectangle(x, y, w + backgroundWidth, h + backgroundWidth, 0x3d3d3d);
		this.button = scene.add.rectangle(x, y, w, h, color).setInteractive();
		this.text = scene.add.text(x, y, text, config).setOrigin(0.5);
		this.button.on('pointerdown', () => {
			this.onClick();
		})
	}

	onClick() {

	}

	move(x, y) {
		this.button.x = x;
		this.button.y = y;

		this.text.x = x;
		this.text.y = y;

		this.buttonBackground.x = x;
		this.buttonBackground.y = y;
	}

}