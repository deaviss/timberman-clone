import { UI_BUTTON } from '../UI/button.js';
import { UI_PANEL } from '../UI/panel.js';
export class shopScene extends Phaser.Scene {
	constructor() {
		super({ key: 'shopScene' })
	}

	init() {

	}

	create() {
		var self = this;
		this.mainGame = this.scene.get('mainScene');
		this.player = this.mainGame.player;
		console.log(this.player.coins)
		this.bg = this.add.rectangle(0, 0, 1000, 1000, 0x000, 0.9).setOrigin(0)
		this.info = this.add.text(20, 20, `💰${this.player.coins}`, {
			fontSize: '28px'
		})
		this.panel = new UI_PANEL(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 30, 500, 700);
		this.backButton = new UI_BUTTON(this, this.sys.game.config.width / 2, 850, 150, 50, 0x333333, '<- Back', {
			color: "#eaeaea"
		}).onClick = () => {
			self.scene.switch('menuScene');
			self.player.updateSkin();
		}
	}

	update() {
		this.panel.update(this.info);
	}

}